"use client";
import React, { useRef, useState, useEffect, FC } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import usePodcastDucking from "./intro/usePodcastDucking";
import FlippingCard from "./flipping-card/FlippingCard";

// --- TYPE DEFINITIONS ---
interface MissionPageProps {
  onNavigateToEvent: (id: string) => void;
}
interface IntroPoint {
  title: string;
  description: string;
}
interface CarouselItem {
  id: string; // Thêm id để xác định sự kiện
  src: string;
  caption: string;
}
interface IntroSectionData {
  id: string;
  title: string;
  subtitle: string;
  similarities: IntroPoint[];
  differences: IntroPoint[];
}
interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType;
  content: IntroPoint[];
  summary: string;
  carouselItems?: CarouselItem[];
}
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

// --- ICONS ---
const EconomyIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />{" "}
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /> <path d="M12 18V6" />{" "}
  </svg>
);
const PoliticsIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M21 6l-5.33 5.33-4-4L3 16" /> <path d="M15 6h6v6" />{" "}
    <path d="M3 10v6h6" />{" "}
  </svg>
);
const CultureIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />{" "}
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />{" "}
  </svg>
);
const PlayIcon: FC = () => (
  <svg height="24" width="24" viewBox="0 0 384 512">
    {" "}
    <path
      fill="currentColor"
      d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
    />{" "}
  </svg>
);
const PauseIcon: FC = () => (
  <svg height="24" width="24" viewBox="0 0 320 512">
    {" "}
    <path
      fill="currentColor"
      d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"
    />{" "}
  </svg>
);
const CheckCircleIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
    <path d="M22 4 12 14.01l-3-3" />{" "}
  </svg>
);
const XCircleIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <circle cx="12" cy="12" r="10" /> <path d="m15 9-6 6" />{" "}
    <path d="m9 9 6 6" />{" "}
  </svg>
);

// --- DATA ---
const introSectionData: IntroSectionData = {
  id: "gccn-hien-nay",
  title: "Tư tưởng độc lập dân tộc của Hồ Chí Minh",
  subtitle: "Điểm mới mẻ và sáng tạo so với các tiền nhân ( Phan Bội Châu )",
  similarities: [
    {
      title: "Tinh thần yêu nước thiết tha",
      description:
        'Cùng có lòng yêu nước sâu sắc, quyết tâm giải phóng dân tộc khỏi ách đô hộ.',
    },
    {
      title: "Tinh thần đấu tranh kiên cường",
      description:
        "Không chấp nhận thỏa hiệp với thực dân, kiên trường đấu tranh đến cùng.",
    },
    {
      title: "Tầm nhìn quốc tế",
      description:
        "Đều tìm hiểu và học hỏi kinh nghiệm cách mạng của các nước trên thế giới.",
    },
    {
      title: "Sự kế thừa cụ thể",
      description:
        "Kế thừa tinh thần \"cần cù, kiệm ước, liêm chính\" trong phong cách sống. Học tập phương pháp tuyên truyền, vận động quần chúng. Tiếp thu ý tưởng về vai trò của trí thức trong cách mạng",
    },
  ],
  differences: [
    {
      title: "Về phương pháp đấu tranh",
      description:
        "Kết hợp đấu tranh vũ trang với đấu tranh chính trị. Đường lối cách mạng khoa học dựa trên chủ nghĩa Mác-Lênin, có cơ sở lý luận vững chắc",
    },
    {
      title: 'Về lực lượng cách mạng',
      description:
        'Dựa vào nhân dân lao động khác với các tiền bối chủ yếu dựa vào tầng lớp trí thức. Tạo ra tổ chức lãnh đạo thống nhất, có kỷ luật cao.',
    },
    {
      title: "Về mục tiêu cách mạng",
      description:
        "Kết hợp độc lập dân tộc với chủ nghĩa xã hội. Không chỉ dừng lại ở độc lập mà hướng đến xây dựng xã hội mới. Gắn cách mạng Việt Nam với phong trào cách mạng thế giới.",
    },
    {
      title: "Về phương pháp lãnh đạo",
      description:
        "Xuất phát từ điều kiện cụ thể của Việt Nam. Vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện Việt Nam.",
    },
  ],
};
// NỘI DUNG ĐƯỢC THAY THẾ TỪ ĐÂY
const missionSections: SectionData[] = [
  {
    id: "doc-lap-dan-toc",
    title: "A",
    subtitle: "Tư tưởng Hồ Chí Minh về Độc lập Dân tộc",
    icon: EconomyIcon,
    summary:
      "Những quan điểm cốt lõi, xuyên suốt của Chủ tịch Hồ Chí Minh về độc lập dân tộc - quyền thiêng liêng và là mục tiêu chiến đấu của nhân dân Việt Nam.",
    content: [
      {
        title: "Quyền thiêng liêng, bất khả xâm phạm",
        description:
          "Độc lập, tự do là quyền thiêng liêng của tất cả các dân tộc. Người đã khẳng định trong Tuyên ngôn Độc lập 1945: “Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do”.",
      },
      {
        title: "Độc lập gắn với hạnh phúc của nhân dân",
        description:
          "Độc lập phải gắn liền với đời sống thiết thực, với cơm no, áo ấm và tự do của nhân dân. Người nhấn mạnh: “Nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có nghĩa lý gì”.",
      },
      {
        title: "Độc lập thật sự, hoàn toàn và triệt để",
        description:
          "Đó phải là một nền độc lập không thỏa hiệp, không phụ thuộc, không “nửa vời”. Độc lập phải đi đôi với tự chủ, tự lực, không trông chờ, dựa dẫm vào các nước khác. ",
      },
      {
        title: "Độc lập gắn liền với thống nhất lãnh thổ",
        description:
          "Chân lý “Nước Việt Nam là một, dân tộc Việt Nam là một” là tư tưởng không bao giờ thay đổi. Tổ quốc nhất định sẽ thống nhất, đồng bào Nam Bắc nhất định sẽ sum họp một nhà.",
      },
    ],
  },
  {
    id: "con-duong-cach-mang",
    title: "B.1",
    subtitle: "Về Cách mạng Giải phóng Dân tộc",
    icon: PoliticsIcon,
    summary:
      "Con đường cứu nước và giải phóng dân tộc theo tư tưởng Hồ Chí Minh là con đường cách mạng vô sản, với vai trò lãnh đạo của Đảng và sức mạnh của toàn dân.",
    carouselItems: [
      {
        id: "thanh-lap-dang",
        src: "/podcast/thanhlap.jpg",
        caption:
          "Hội nghị thành lập Đảng Cộng sản Việt Nam năm 1930, đánh dấu bước ngoặt của cách mạng Việt Nam.",
      },
      {
        id: "cach-mang-thang-tam",
        src: "/podcast/cmt8.jpg",
        caption:
          "Nhân dân Hà Nội giành chính quyền trong Cách mạng Tháng Tám năm 1945.",
      },
      {
        id: "dien-bien-phu",
        src: "/podcast/ctdbp.jpg",
        caption:
          "Chiến thắng Điện Biên Phủ (1954), một minh chứng hùng hồn cho sức mạnh dân tộc.",
      },
    ],
    content: [
      {
        title: "Con đường Cách mạng Vô sản",
        description:
          "Từ thất bại của các phong trào yêu nước trước đó, Người khẳng định: “Muốn cứu nước và giải phóng dân tộc, không có con đường nào khác con đường cách mạng vô sản.",
      },
      {
        title: "Vai trò lãnh đạo của Đảng Cộng sản",
        description:
          "Cách mạng chỉ có thể thắng lợi khi có Đảng Cộng sản – đội tiên phong của giai cấp công nhân và toàn dân – tổ chức, giác ngộ và lãnh đạo quần chúng.",
      },
      {
        title: "Sức mạnh Đại đoàn kết toàn dân",
        description:
          "Phải xây dựng khối đại đoàn kết toàn dân, lấy liên minh công–nông làm nền tảng. Người nhấn mạnh: “Có dân là có tất cả… Công nông là gốc cách mệnh.",
      },
      {
        title: "Chủ động, sáng tạo và thắng lợi trước",
        description:
          "Đây là luận điểm sáng tạo của Hồ Chí Minh: cách mạng ở thuộc địa có thể giành thắng lợi trước cách mạng vô sản ở chính quốc.",
      },
      {
        title: "Sử dụng Bạo lực Cách mạng",
        description:
          "Vì đế quốc không tự nguyện trao trả độc lập, nên giải phóng dân tộc phải là một cuộc cách mạng bạo lực, kết hợp đấu tranh chính trị và vũ trang.",
      },
    ],
  },
  {
    id: "moi-quan-he-cnxh",
    title: "B.2",
    subtitle: "Mối quan hệ giữa Độc lập Dân tộc và CNXH",
    icon: CultureIcon,
    summary:
      "Độc lập dân tộc và chủ nghĩa xã hội có mối quan hệ biện chứng, thống nhất. Độc lập là tiền đề, và chủ nghĩa xã hội là con đường bảo vệ độc lập, mang lại ấm no.",
    carouselItems: [
      {
        id: "tuyen-ngon-doc-lap",
        src: "/podcast/tuyenngon.jpg",
        caption:
          "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày 2/9/1945, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
      },
      {
        id: "thong-nhat-dat-nuoc",
        src: "/podcast/gpmn.jpg",
        caption:
          "Ngày thống nhất đất nước 30/4/1975, mở ra kỷ nguyên xây dựng CNXH trên cả nước.",
      },
      {
        id: "doi-moi",
        src: "/podcast/doimoidang.jpg",
        caption:
          "Việt Nam trong công cuộc Đổi mới, xây dựng đất nước theo định hướng XHCN.",
      },
    ],
    content: [
      {
        title: "Độc lập là tiền đề của CNXH",
        description:
          "Độc lập dân tộc là điều kiện tiên quyết để xây dựng chủ nghĩa xã hội, mang lại tự do, ấm no, hạnh phúc thực sự cho nhân dân.",
      },
      {
        title: "CNXH bảo vệ vững chắc Độc lập",
        description:
          "Chủ nghĩa xã hội là con đường để bảo đảm và giữ vững nền độc lập dân tộc, xây dựng đất nước giàu mạnh, nâng cao đời sống vật chất và tinh thần của nhân dân.",
      },
      {
        title: "Giá trị và ý nghĩa thời đại",
        description:
          "Tư tưởng này không chỉ soi đường cho cách mạng Việt Nam mà còn cổ vũ các dân tộc bị áp bức, trở thành kim chỉ nam cho phong trào giải phóng dân tộc toàn cầu.",
      },
    ],
  },
];
const quizQuestions: QuizQuestion[] = [
  {
    question:
      'Theo tư tưởng Hồ Chí Minh, yếu tố nào KHÔNG phải là nội hàm của "độc lập dân tộc"?',
    options: [
      "Gắn liền với tự do, hạnh phúc của nhân dân.",
      "Phải là nền độc lập thật sự, toàn vẹn.",
      "Phải phụ thuộc vào cách mạng ở chính quốc.",
      "Gắn liền với thống nhất, toàn vẹn lãnh thổ.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Hồ Chí Minh đưa ra luận điểm sáng tạo rằng cách mạng thuộc địa có thể nổ ra và thắng lợi TRƯỚC cách mạng vô sản ở chính quốc.",
  },
  {
    question:
      "Theo Hồ Chí Minh, con đường cách mạng duy nhất đúng đắn để cứu nước và giải phóng dân tộc là gì?",
    options: [
      "Con đường cải cách ôn hòa.",
      "Dựa vào sự giúp đỡ của ngoại bang.",
      "Con đường cách mạng tư sản.",
      "Con đường cách mạng vô sản.",
    ],
    correctAnswerIndex: 3,
    explanation:
      "Người khẳng định: “Muốn cứu nước và giải phóng dân tộc, không có con đường nào khác con đường cách mạng vô sản.",
  },
  {
    question:
      'Lực lượng nào được Hồ Chí Minh xác định là "gốc cách mệnh", làm nền tảng cho khối đại đoàn kết toàn dân?',
    options: [
      "Giai cấp tư sản dân tộc.",
      "Tầng lớp trí thức, tiểu tư sản.",
      "Liên minh công - nông.",
      "Tất cả các tầng lớp yêu nước.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Người nhấn mạnh: “Công nông là gốc cách mệnh” và khối đại đoàn kết toàn dân phải lấy liên minh công–nông làm nòng cốt.",
  },
  {
    question:
      "Mối quan hệ giữa độc lập dân tộc (ĐLDT) và chủ nghĩa xã hội (CNXH) được thể hiện như thế nào?",
    options: [
      "ĐLDT và CNXH là hai giai đoạn hoàn toàn tách rời.",
      "ĐLDT là điều kiện tiên quyết để tiến lên CNXH.",
      "CNXH cản trở việc bảo vệ nền ĐLDT.",
      "Chỉ cần giành được ĐLDT là sẽ có CNXH.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Hai mục tiêu này thống nhất biện chứng: Độc lập dân tộc là điều kiện tiên quyết để tiến lên CNXH, và CNXH là con đường bảo đảm giữ vững nền độc lập ấy.",
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  },
};
const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// --- HELPER FUNCTIONS & COMPONENTS ---
const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const ImageCarousel: FC<{
  items: CarouselItem[];
  onImageClick: (id: string) => void;
}> = ({ items, onImageClick }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const imageIndex = wrap(0, items.length, page);
  const paginate = (newDirection: number) => {
    setPage((prev) => [prev[0] + newDirection, newDirection]);
  };

  useEffect(() => {
    const autoplay = setInterval(() => paginate(1), 5000);
    return () => clearInterval(autoplay);
  }, []);

  return (
    <div
      className="relative aspect-video w-full h-full flex items-center justify-center rounded-lg shadow-2xl overflow-hidden border-4 border-stone-700/50 bg-stone-900 cursor-pointer"
      onClick={() => onImageClick(items[imageIndex].id)}
      role="button"
      aria-label="Xem thêm thông tin"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={items[imageIndex].src}
          custom={direction}
          variants={carouselVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute w-full h-full object-cover grayscale-[30%] contrast-125 pointer-events-none" /* <- không bắt chuột */
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/800x450/2a2a2a/999999?text=Image+Error";
          }}
        />
      </AnimatePresence>

      {/* Caption: không bắt chuột để click xuyên xuống container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={items[imageIndex].caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-center text-sm"
          >
            {items[imageIndex].caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const PodcastPlayer: FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null) as React.RefObject<HTMLAudioElement>;
  usePodcastDucking(audioRef);
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <motion.div
      className="bg-stone-800/60 backdrop-blur-md border border-stone-700 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 shadow-2xl shadow-stone-950/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
    >
      {" "}
      <audio
        ref={audioRef}
        src="/podcast/podcast.mp4"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />{" "}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 bg-black rounded-full flex items-center justify-center border-4 border-stone-700 shadow-lg">
        {" "}
        <motion.div
          className="w-full h-full bg-black rounded-full flex items-center justify-center"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {" "}
          <div
            className="w-28 h-28 md:w-36 md:h-36 bg-cover bg-center rounded-full"
            style={{
              backgroundImage:
                "url('/co.jpg')",
            }}
          >
            {" "}
            <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center">
              {" "}
              <div className="w-8 h-8 bg-stone-200 rounded-full border-4 border-stone-800"></div>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
      <div className="w-full">
        {" "}
        <h3 className="text-2xl md:text-3xl font-bold text-stone-100">
          {" "}
          PODCAST{" "}
        </h3>{" "}
        <p className="text-stone-300 mb-4 text-lg">
          Phân tích Tư tưởng Hồ Chí Minh
        </p>{" "}
        <div className="flex gap-2 mb-4">
          {" "}
          <span className="bg-stone-700 text-stone-300 text-xs font-semibold px-3 py-1 rounded-full">
            {" "}
            Độc lập Dân tộc{" "}
          </span>{" "}
          <span className="bg-stone-700 text-stone-300 text-xs font-semibold px-3 py-1 rounded-full">
            {" "}
            Chủ nghĩa Xã hội{" "}
          </span>{" "}
        </div>{" "}
        <div className="bg-stone-900/50 rounded-lg p-3 flex items-center gap-4">
          {" "}
          <button
            onClick={handlePlayPause}
            className="text-stone-200 hover:text-amber-300 transition-colors"
          >
            {" "}
            {isPlaying ? <PauseIcon /> : <PlayIcon />}{" "}
          </button>{" "}
          <div className="w-full flex items-center gap-2">
            {" "}
            <span className="text-xs text-stone-400">
              {" "}
              {formatTime(currentTime)}{" "}
            </span>{" "}
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-stone-600 rounded-lg appearance-none cursor-pointer range-sm"
            />{" "}
            <span className="text-xs text-stone-400">
              {" "}
              {formatTime(duration)}{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </motion.div>
  );
};
const ModernWorkerSection: FC<{ data: IntroSectionData }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"similarities" | "differences">(
    "similarities"
  );
  const content =
    activeTab === "similarities" ? data.similarities : data.differences;
  return (
    <motion.section
      id={data.id}
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {" "}
      <motion.div variants={itemVariants} className="text-center mb-12">
        {" "}
        <h2
          className="text-4xl md:text-5xl font-bold text-amber-100/95 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {" "}
          {data.title}{" "}
        </h2>{" "}
        <p className="text-lg text-stone-400">{data.subtitle}</p>{" "}
      </motion.div>{" "}
      <motion.div variants={itemVariants} className="flex justify-center mb-12 relative z-10">
        {" "}
        <div className="bg-stone-800/50 border border-stone-700 rounded-full p-1.5 flex gap-2">
          {" "}
          <button
            onClick={() => setActiveTab("similarities")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "similarities"
                ? "bg-amber-400 text-stone-900"
                : "text-stone-300 hover:bg-stone-700/50"
            }`}
          >
            {" "}
            Điểm tương đồng{" "}
          </button>{" "}
          <button
            onClick={() => setActiveTab("differences")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "differences"
                ? "bg-amber-400 text-stone-900"
                : "text-stone-300 hover:bg-stone-700/50"
            }`}
          >
            {" "}
            Sáng tạo & Khác biệt{" "}
          </button>{" "}
        </div>{" "}
      </motion.div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {" "}
        <AnimatePresence mode="wait">
          {" "}
          {content.map((item, index) => (
            <motion.div
              key={activeTab + index}
              className="bg-gradient-to-br from-stone-800 to-stone-800/70 p-6 rounded-xl border border-stone-700"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {" "}
              <h4 className="font-bold text-lg text-amber-200/95 mb-2">
                {" "}
                {item.title}{" "}
              </h4>{" "}
              <p className="text-stone-300 leading-relaxed text-sm">
                {" "}
                {item.description}{" "}
              </p>{" "}
            </motion.div>
          ))}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
    </motion.section>
  );
};
const EconomicSection: FC<{ section: SectionData }> = ({ section }) => {
  return (
    <motion.section
      id={section.id}
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {" "}
      <motion.div variants={itemVariants} className="text-center mb-12">
        {" "}
        <h3 className="text-2xl font-semibold text-amber-100/90 tracking-wide">
          {" "}
          {section.subtitle}{" "}
        </h3>{" "}
        <p className="mt-2 text-stone-400 italic max-w-2xl mx-auto">
          {" "}
          {section.summary}{" "}
        </p>{" "}
      </motion.div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {" "}
        {section.content.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-stone-800/50 p-6 rounded-lg border border-stone-700 text-center hover:bg-stone-800 transition-colors"
          >
            {" "}
            <div className="mx-auto bg-amber-300/20 text-amber-300 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              {" "}
              <EconomyIcon />{" "}
            </div>{" "}
            <h4 className="font-bold text-lg text-amber-200/95 mb-2">
              {" "}
              {item.title}{" "}
            </h4>{" "}
            <p className="text-stone-300 leading-relaxed text-sm">
              {" "}
              {item.description}{" "}
            </p>{" "}
          </motion.div>
        ))}{" "}
      </div>{" "}
    </motion.section>
  );
};

const QuizSection: FC<{ questions: QuizQuestion[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correctAnswerIndex;

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    const correct = index === correctIndex;
    setSelectedAnswerIndex(index);
    setIsCorrect(correct);
    setHasAnswered(true);
  };

  const handleNext = () => {
    if (hasAnswered && isCorrect) setScore((s) => s + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswerIndex(null);
      setIsCorrect(null);
      setHasAnswered(false);
      window.getSelection?.()?.removeAllRanges?.();
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsCorrect(null);
    setHasAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <motion.section
      id="quiz"
      className="relative isolate z-30 py-16 pointer-events-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {showResult ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-stone-800/60 border border-stone-700 rounded-2xl p-8"
        >
          <h3 className="text-3xl font-bold text-amber-200 mb-4">Hoàn thành!</h3>
          <p className="text-lg text-stone-300 mb-6">
            Bạn đã trả lời đúng{" "}
            <span className="font-bold text-amber-400 text-xl">{score}</span> /{" "}
            <span className="font-bold text-xl">{questions.length}</span> câu.
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="bg-amber-400 text-stone-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105"
            style={{ touchAction: "manipulation" }}
          >
            Làm lại
          </button>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-100/95 mb-2">
              Kiểm tra kiến thức
            </h2>
            <p className="text-lg text-stone-400">Chọn đáp án và xem giải thích.</p>
          </div>

          {/* Card */}
          <div className="relative z-10 bg-stone-800/60 border border-stone-700 rounded-2xl p-8 min-h-[30rem] flex flex-col justify-between pointer-events-auto">
            <div>
              <p className="text-stone-400 mb-2">
                Câu hỏi {currentQuestionIndex + 1}/{questions.length}
              </p>

              <AnimatePresence mode="wait">
                <motion.h4
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-semibold text-stone-100 mb-8"
                >
                  {currentQuestion.question}
                </motion.h4>
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswerIndex === index;
                  const isTheCorrect = index === correctIndex;

                  // Xây dựng class theo trạng thái LOCK
                  let cls =
                    "p-4 rounded-lg text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ";

                  if (!hasAnswered) {
                    cls += "bg-stone-700/60 hover:bg-stone-700 cursor-pointer";
                  } else {
                    // Đã chọn xong: lock & tô màu
                    if (isSelected && isCorrect) {
                      cls += "bg-green-500/80 text-stone-900 cursor-default";
                    } else if (isSelected && !isCorrect) {
                      cls += "bg-red-500/80 text-stone-50 cursor-default";
                    } else if (!isSelected && !isCorrect && isTheCorrect) {
                      // Hiển thị đáp án đúng khi người dùng chọn sai
                      cls += "bg-green-500/70 text-stone-900 cursor-default";
                    } else {
                      cls += "bg-stone-700/40 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelect(index)}
                      className={cls}
                      style={{ touchAction: "manipulation" }}
                      aria-pressed={isSelected}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Giải thích + Next */}
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-6 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div>
                  <p
                    className={`flex items-center gap-2 font-bold ${
                      isCorrect ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}
                    {isCorrect ? "Chính xác!" : "Chưa chính xác."}
                  </p>
                  <p className="text-stone-400 text-sm mt-1">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-amber-400 text-stone-900 font-bold py-3 px-8 rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 w-full md:w-auto flex-shrink-0"
                  style={{ touchAction: "manipulation" }}
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Câu tiếp theo"
                    : "Xem kết quả"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};
const PoliticalSection: FC<{
  section: SectionData;
  onNavigateToEvent: (id: string) => void;
}> = ({ section, onNavigateToEvent }) => {
  return (
    <motion.section
      id={section.id}
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants}>
          <h2 className="h-serif text-3xl md:text-4xl font-bold text-[#c5b8a5] mb-4">
            {section.title}
          </h2>
          <p className="text-[#e8e2d9]/75 mb-6">{section.subtitle}</p>
          <ul className="space-y-4">
            {section.content.map((c, idx) => (
              <li key={idx} className="pl-4 border-l-2 border-amber-400/40">
                <div className="font-semibold text-amber-300">{c.title}</div>
                <div className="text-[#e8e2d9]/75">{c.description}</div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group not-prose">
          {section.carouselItems && (
            <>
              <ImageCarousel
                items={section.carouselItems}
                onImageClick={onNavigateToEvent}
              />

              {/* Tooltip overlay */}
              <div
                className="
                  pointer-events-none absolute inset-0 z-20
                  flex items-end justify-center pb-3
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <div className="rounded-full bg-black/70 backdrop-blur-sm text-amber-300 text-xs md:text-sm px-3 py-2 shadow-lg">
                  Nhấn vào để xem thêm thông tin
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

const CulturalSection: FC<{
  section: SectionData;
  onNavigateToEvent: (id: string) => void;
}> = ({ section, onNavigateToEvent }) => {
  return (
    <motion.section
      id={section.id}
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={itemVariants} className="lg:order-last">
          <h2 className="h-serif text-3xl md:text-4xl font-bold text-[#c5b8a5] mb-4">
            {section.title}
          </h2>
          <p className="text-[#e8e2d9]/75 mb-6">{section.subtitle}</p>
          <ul className="space-y-4">
            {section.content.map((c, idx) => (
              <li key={idx} className="pl-4 border-l-2 border-amber-400/40">
                <div className="font-semibold text-amber-300">{c.title}</div>
                <div className="text-[#e8e2d9]/75">{c.description}</div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="relative group lg:order-first not-prose">
          {section.carouselItems && (
            <>
              <ImageCarousel
                items={section.carouselItems}
                onImageClick={onNavigateToEvent}
              />

              {/* Tooltip overlay */}
              <div
                className="
                  pointer-events-none absolute inset-0 z-20
                  flex items-end justify-center pb-3
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <div className="rounded-full bg-black/70 backdrop-blur-sm text-amber-300 text-xs md:text-sm px-3 py-2 shadow-lg text-center">
                  Nhấn vào để xem thêm thông tin
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

const headerLines = ["Tư tưởng Hồ Chí Minh về", "Độc lập Dân tộc & CNXH"];

const MissionPage: FC<MissionPageProps> = ({ onNavigateToEvent }) => {
  const scrollRef = useRef<HTMLElement | null>(null);
  const [bgOpacity, setBgOpacity] = useState(1); // 1: tối, 0.7: vừa, 0: sáng hoàn toàn
  const [textVisible, setTextVisible] = useState(false);
  const [headerDone, setHeaderDone] = useState(false);

  useEffect(() => {
    // Giai đoạn 1: background chuyển từ 1 -> 0.7
    setTimeout(() => {
      setBgOpacity(0.7);
      // Giai đoạn 2: hiện chữ sau khi background đã sáng vừa phải
      setTimeout(() => {
        setTextVisible(true);
        // Giai đoạn 3: sau khi chữ hiện ra hết, background sáng hoàn toàn
        setTimeout(() => {
          setHeaderDone(true);
          setBgOpacity(0);
        }, 2200); // thời gian chữ chạy chậm hơn
      }, 800); // thời gian cho background sáng vừa phải
    }, 200);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Roboto:wght@400;700&display=swap'); body { background-color: #1c1917; } input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background: #fcd34d; border-radius: 50%; cursor: pointer; margin-top: -7px; transition: background-color 0.2s; } input[type="range"]::-webkit-slider-thumb:hover { background: #fbbf24; } input[type="range"]::-moz-range-thumb { width: 16px; height: 16px; background: #fcd34d; border-radius: 50%; cursor: pointer; }`}</style>
      <main
        ref={scrollRef}
        className="bg-[#1c1917] text-stone-200 min-h-screen font-sans relative z-10"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        <div>
          <header
            className="text-center h-screen flex flex-col justify-center items-center bg-cover bg-center relative"
            style={{
              backgroundImage:
                "linear-gradient(rgba(28, 25, 23, 0.8), rgba(28, 25, 23, 1)), url('/podcast/main_bg@2x.webp')",
            }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: bgOpacity }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#111",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", zIndex: 3 }}>
              {headerLines.map((line, idx) => (
                <motion.h1
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{
                    duration: 1.2, // chạy chậm hơn
                    delay: textVisible ? idx * 1.1 : 0, // delay giữa các dòng lâu hơn
                    ease: "easeOut",
                  }}
                  className="text-5xl md:text-7xl font-bold text-amber-100/95 mb-2 leading-tight px-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {line}
                </motion.h1>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 1.2,
                delay: textVisible ? headerLines.length * 1.1 : 0,
                ease: "easeOut",
              }}
              className="text-lg text-stone-400 max-w-2xl px-6"
              style={{ position: "relative", zIndex: 3 }}
            >
              Khám phá những quan điểm cốt lõi về con đường giải phóng dân tộc và mối quan hệ biện chứng với chủ nghĩa xã hội.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 1.2,
                delay: textVisible ? headerLines.length * 1.1 + 0.5 : 0,
                ease: "easeOut",
              }}
              className="w-40 h-0.5 bg-amber-200/40 mx-auto mt-8"
              style={{ position: "relative", zIndex: 3 }}
            ></motion.div>
            <motion.div
              className="absolute bottom-10 text-stone-500 animate-bounce"
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ zIndex: 3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </motion.div>
          </header>
          <div className="space-y-10 max-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* <AboutUs/> */}
            <FlippingCard/>
            <PodcastPlayer />
            <div className="text-center mt-24">
              <h2
                className="text-4xl md:text-5xl font-bold text-amber-100/95 mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {" "}
                Nội dung cốt lõi Tư tưởng Hồ Chí Minh{" "}
              </h2>
              <p className="text-lg text-stone-400">
                {" "}
                Những quan điểm nền tảng về cách mạng Việt Nam{" "}
              </p>
            </div>
            <EconomicSection section={missionSections[0]} />
            <PoliticalSection
              section={missionSections[1]}
              onNavigateToEvent={onNavigateToEvent}
            />
            <CulturalSection
              section={missionSections[2]}
              onNavigateToEvent={onNavigateToEvent}
            />
            <ModernWorkerSection data={introSectionData} /> 
            <QuizSection questions={quizQuestions} />
          </div>
          <motion.footer
            className="text-center py-12 mt-24 border-t border-stone-700/50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <p className="text-stone-500 text-sm">
              {" "}
              Nội dung được tổng hợp từ tài liệu cung cấp.{" "}
            </p>
          </motion.footer>
        </div>
      </main>
    </>
  );
};

export default MissionPage;