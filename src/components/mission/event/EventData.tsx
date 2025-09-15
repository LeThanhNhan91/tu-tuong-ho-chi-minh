export interface EventData {
    id: string;
    year: string;
    title: string;
    mainQuote: string;
    imageUrl: string;
    description: {
        paragraph1: string;
        paragraph2: string;
    };
    gallery: {
        image1: string;
        caption1: string;
        image2: string;
        caption2: string;
    };
    finalQuote: {
        text: string;
        author: string;
    };
}

// Dữ liệu cho các sự kiện, liên kết với ID từ carousel
export const eventsData: EventData[] = [
    {
        id: "thanh-lap-dang",
        year: "1930",
        title: "Hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam",
        mainQuote: "Đảng Cộng sản Việt Nam ra đời là bước ngoặt vĩ đại của cách mạng Việt Nam.",
        imageUrl: "/podcast/dcsvn.jpg",
        description: {
            paragraph1: "Từ ngày 6/1 đến 7/2/1930, tại Cửu Long (Hương Cảng, Trung Quốc), Hội nghị hợp nhất các tổ chức cộng sản được tiến hành dưới sự chủ trì của lãnh tụ Nguyễn Ái Quốc. Hội nghị đã quyết định thống nhất các tổ chức cộng sản ở Việt Nam thành một đảng duy nhất, lấy tên là Đảng Cộng sản Việt Nam.",
            paragraph2: "Sự ra đời của Đảng đã chấm dứt thời kỳ khủng hoảng về đường lối và giai cấp lãnh đạo của cách mạng Việt Nam, khẳng định vai trò lãnh đạo duy nhất của giai cấp công nhân thông qua đội tiên phong là Đảng Cộng sản.",
        },
        gallery: {
            image1: "/podcast/nguyenaiquoc.jpg",
            caption1: "Lãnh tụ Nguyễn Ái Quốc, người chủ trì Hội nghị hợp nhất.",
            image2: "/podcast/cuonglinh.jpg",
            caption2: "Chánh cương vắn tắt, Sách lược vắn tắt - Cương lĩnh chính trị đầu tiên của Đảng.",
        },
        finalQuote: {
            text: "Việc thành lập Đảng là một bước ngoặt vô cùng quan trọng trong lịch sử cách mạng Việt Nam ta.",
            author: "Hồ Chí Minh",
        },
    },
    {
        id: "cach-mang-thang-tam",
        year: "1945",
        title: "Cách mạng Tháng Tám thành công",
        mainQuote: "Toàn dân Việt Nam đứng dậy giành lại chính quyền từ tay phát xít Nhật và bè lũ tay sai.",
        imageUrl: "/podcast/cmtt.jpg",
        description: {
            paragraph1: "Nắm bắt 'thời cơ ngàn năm có một' khi phát xít Nhật đầu hàng Đồng minh, Đảng Cộng sản Đông Dương đã lãnh đạo toàn dân tiến hành cuộc Tổng khởi nghĩa giành chính quyền trong cả nước. Chỉ trong vòng 15 ngày cuối tháng 8/1945, cuộc cách mạng đã giành thắng lợi hoàn toàn.",
            paragraph2: "Thắng lợi của Cách mạng Tháng Tám đã đập tan xiềng xích nô lệ của thực dân Pháp và phát xít Nhật, lật đổ chế độ quân chủ chuyên chế tồn tại hàng ngàn năm, lập nên nước Việt Nam Dân chủ Cộng hòa.",
        },
        gallery: {
            image1: "/podcast/khongioi.jpg",
            caption1: "Quần chúng nhân dân Hà Nội vùng lên khởi nghĩa giành chính quyền.",
            image2: "/podcast/hue.jpg",
            caption2: "Vua Bảo Đại đọc chiếu thoái vị, chấm dứt chế độ phong kiến tại Việt Nam.",
        },
        finalQuote: {
            text: "Cách mạng Tháng Tám đã lật đổ nền quân chủ mấy mươi thế kỷ, đã đánh tan xiềng xích thực dân gần 100 năm...",
            author: "Hồ Chí Minh",
        },
    },
    {
        id: "tuyen-ngon-doc-lap",
        year: "1945",
        title: "Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa",
        mainQuote: "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do, độc lập.",
        imageUrl: "/podcast/tndl.jpg",
        description: {
            paragraph1: "Ngày 2/9/1945, tại Quảng trường Ba Đình lịch sử, trước hàng chục vạn đồng bào, Chủ tịch Hồ Chí Minh đã thay mặt Chính phủ lâm thời đọc bản Tuyên ngôn Độc lập, trịnh trọng tuyên bố với thế giới về sự ra đời của nước Việt Nam Dân chủ Cộng hòa.",
            paragraph2: "Bản Tuyên ngôn không chỉ là văn kiện pháp lý khẳng định chủ quyền quốc gia mà còn là một tác phẩm chính luận giàu giá trị, khẳng định quyền con người và quyền của các dân tộc trên thế giới.",
        },
        gallery: {
            image1: "/podcast/badinh.jpg",
            caption1: "Biển người tại Quảng trường Ba Đình lịch sử trong ngày Lễ Độc lập.",
            image2: "/podcast/hcmdoc.jpg",
            caption2: "Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.",
        },
        finalQuote: {
            text: "Tất cả các dân tộc trên thế giới đều sinh ra bình đẳng, dân tộc nào cũng có quyền sống, quyền sung sướng và quyền tự do.",
            author: "Hồ Chí Minh, trích Tuyên ngôn Độc lập",
        },
    },
    {
        id: "dien-bien-phu",
        year: "1954",
        title: "Chiến thắng lịch sử Điện Biên Phủ",
        mainQuote: "Lừng lẫy năm châu, chấn động địa cầu.",
        imageUrl: "/podcast/dbp.jpg",
        description: {
            paragraph1: "Sau 56 ngày đêm chiến đấu kiên cường, dũng cảm, sáng tạo, quân và dân ta đã đập tan toàn bộ tập đoàn cứ điểm Điện Biên Phủ - 'pháo đài bất khả xâm phạm' của thực dân Pháp, kết thúc thắng lợi cuộc kháng chiến chống Pháp.",
            paragraph2: "Chiến thắng Điện Biên Phủ là đỉnh cao của cuộc kháng chiến, buộc Chính phủ Pháp phải ký kết Hiệp định Genève, chấm dứt chiến tranh, lập lại hòa bình ở Đông Dương.",
        },
        gallery: {
            image1: "/podcast/keophao.jpg",
            caption1: "Bộ đội ta dùng sức người kéo pháo vào trận địa, thể hiện ý chí quyết chiến quyết thắng.",
            image2: "/podcast/hodecastries.jpg",
            caption2: "Lá cờ 'Quyết chiến Quyết thắng' tung bay trên nóc hầm tướng De Castries.",
        },
        finalQuote: {
            text: "Chiến thắng Điện Biên Phủ là một cái mốc chói lọi bằng vàng của lịch sử. Nó ghi rõ nơi chủ nghĩa thực dân lăn xuống dốc và tan rã.",
            author: "Hồ Chí Minh",
        },
    },
    {
        id: "thong-nhat-dat-nuoc",
        year: "1975",
        title: "Đại thắng Mùa xuân 1975 - Giải phóng miền Nam, thống nhất đất nước",
        mainQuote: "Đánh cho Mỹ cút, đánh cho Ngụy nhào.",
        imageUrl: "/podcast/tndn.jpg",
        description: {
            paragraph1: "Bằng cuộc Tổng tiến công và nổi dậy Mùa Xuân năm 1975 mà đỉnh cao là Chiến dịch Hồ Chí Minh lịch sử, quân và dân ta đã giành thắng lợi hoàn toàn, kết thúc 21 năm kháng chiến chống Mỹ cứu nước gian khổ và anh dũng.",
            paragraph2: "Ngày 30/4/1975, miền Nam được hoàn toàn giải phóng, non sông Việt Nam thu về một mối. Thắng lợi này đã mở ra một kỷ nguyên mới cho đất nước: kỷ nguyên của độc lập, thống nhất và đi lên chủ nghĩa xã hội.",
        },
        gallery: {
            image1: "/podcast/dinhem.jpg",
            caption1: "Xe tăng quân Giải phóng tiến vào Dinh Độc Lập, đánh dấu thời khắc lịch sử.",
            image2: "/podcast/anmung.jpg",
            caption2: "Nhân dân Sài Gòn đổ ra đường chào đón quân Giải phóng, mừng ngày thống nhất.",
        },
        finalQuote: {
            text: "Năm tháng sẽ trôi qua, nhưng thắng lợi của nhân dân ta trong sự nghiệp chống Mỹ, cứu nước mãi mãi được ghi vào lịch sử dân tộc ta như một trong những trang chói lọi nhất.",
            author: "Lê Duẩn",
        },
    },
    {
        id: "doi-moi",
        year: "1986",
        title: "Đại hội VI của Đảng và công cuộc Đổi Mới",
        mainQuote: "Nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật.",
        imageUrl: "/podcast/doimoi.jpg",
        description: {
            paragraph1: "Trước những khó khăn, khủng hoảng kinh tế - xã hội của đất nước sau chiến tranh, Đại hội đại biểu toàn quốc lần thứ VI của Đảng (12/1986) đã đề ra đường lối Đổi Mới. Đây là một quyết sách mang tính bước ngoặt, thể hiện tư duy và tầm nhìn chiến lược của Đảng.",
            paragraph2: "Công cuộc Đổi Mới tập trung vào việc chuyển đổi từ nền kinh tế kế hoạch hóa tập trung sang nền kinh tế hàng hóa nhiều thành phần, vận hành theo cơ chế thị trường có sự quản lý của Nhà nước, theo định hướng xã hội chủ nghĩa; đồng thời mở rộng quan hệ đối ngoại.",
        },
        gallery: {
            image1: "/podcast/daihoi6.jpg",
            caption1: "Đại hội Đảng lần thứ VI năm 1986, nơi khởi xướng đường lối Đổi Mới toàn diện.",
            image2: "/podcast/kinhte.jpg",
            caption2: "Sự phát triển kinh tế vượt bậc là thành tựu nổi bật của hơn 35 năm Đổi Mới.",
        },
        finalQuote: {
            text: "Đổi mới không phải là phủ định quá khứ, mà là quá trình tìm tòi, sáng tạo để đưa đất nước đi lên.",
            author: "Nguyễn Văn Linh",
        },
    },
];