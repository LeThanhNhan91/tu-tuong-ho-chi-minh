"use client";
import React, { useState, useRef, useEffect } from "react";

/** DỮ LIỆU NHÓM */
const MEMBERS = [
  { 
    name: "Lâm Tiểu My", 
    role: "Leader", 
    major: "Full-stack Developer",
    description: "Team leader với tầm nhìn chiến lược, chuyên xây dựng kiến trúc hệ thống và quản lý dự án. Đam mê tạo ra những sản phẩm có tác động tích cực.",
    img: "/podcast/my.jpg",
    skills: ["Full-stack", "React", "C#"]
  },
  { 
    name: "Trần Thành Đạt", 
    role: "Member", 
    major: "Full-stack Developer",
    description: "Chuyên gia về hiệu suất và tối ưu hóa, luôn tìm cách cải thiện tốc độ và trải nghiệm người dùng trong mỗi dự án.",
    img: "/podcast/dat.jpg",
    skills: ["Full-stack", "React", "C#"]
  },
  { 
    name: "Lê Thành Nhân", 
    role: "Member", 
    major: "Full-stack Developer",
    description: "Sáng tạo trong việc thiết kế giao diện người dùng, kết hợp nghệ thuật và công nghệ để tạo ra những trải nghiệm độc đáo.",
    img: "/podcast/nhan.jpg",
    skills: ["Full-stack", "React", "C#"]
  },
  { 
    name: "Nguyễn Hà Linh", 
    role: "Member", 
    major: "Full-stack Developer",
    description: "Chú trọng vào bảo mật và ổn định hệ thống, đảm bảo mọi ứng dụng đều an toàn và đáng tin cậy cho người dùng.",
    img: "/podcast/linh.jpg",
    skills: ["Full-stack", "React", "C#"]
  },
  { 
    name: "Trương Tấn Huy", 
    role: "Member", 
    major: "Full-stack Developer",
    description: "Chuyên gia tích hợp và triển khai, giúp kết nối các hệ thống khác nhau và đưa sản phẩm từ ý tưởng thành hiện thực. Và kiểm tra bảo mật hệ thống.",
    img: "/podcast/huy.jpg",
    skills: ["Full-stack", "React", "C#"]
  },
];

const fallbackSrc = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500'><rect width='100%' height='100%' fill='%232a2726'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23c5b8a5' font-size='18'>No Image</text></svg>";

const AboutUs: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="text-[#e8e2d9] min-h-screen relative overflow-hidden" ref={containerRef}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');
        :root {
          --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
          --font-serif: 'Playfair Display', Georgia, serif;
        }
        body { font-family: var(--font-sans); }
        .h-serif { font-family: var(--font-serif); }
        
        .aurora-bg {
          background: linear-gradient(135deg, 
            rgba(197, 184, 165, 0.1) 0%,
            rgba(99, 102, 241, 0.05) 25%,
            rgba(236, 72, 153, 0.05) 50%,
            rgba(245, 158, 11, 0.05) 75%,
            rgba(197, 184, 165, 0.1) 100%);
          background-size: 400% 400%;
          animation: aurora 15s ease infinite;
        }
        
        @keyframes aurora {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .card-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(45deg, 
            rgba(197, 184, 165, 0.4),
            transparent,
            rgba(197, 184, 165, 0.4)
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card-glow:hover::before {
          opacity: 1;
        }
      `}</style>

      {/* Dynamic Background */}
      <div className="fixed inset-0 aurora-bg opacity-30" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#c5b8a5] rounded-full opacity-20 floating"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative">
            <h1 className="h-serif text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-[#c5b8a5] via-[#e9dcc8] to-[#c5b8a5] bg-clip-text text-transparent mb-6">
              About Us
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-[#e8e2d9]/80 max-w-4xl mx-auto leading-relaxed">
            Chúng tôi là một nhóm 
            <span className="bg-gradient-to-r from-[#c5b8a5] to-[#e9dcc8] bg-clip-text text-transparent font-semibold"> đam mê công nghệ thông tin & AI</span>, 
            kết hợp kể chuyện đa phương tiện với trải nghiệm web hiện đại.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-[#e8e2d9]/70">5 thành viên tài năng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="h-serif text-4xl md:text-5xl font-bold text-[#c5b8a5] mb-4">
            Đội ngũ thành viên
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c5b8a5] to-transparent mx-auto" />
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-6">
          {MEMBERS.map((member, index) => (
            <div
              key={member.name}
              className={`group relative transition-all duration-700 ease-out ${
                hoveredMember !== null && hoveredMember !== index 
                  ? 'scale-95 opacity-60' 
                  : 'scale-100 opacity-100'
              } ${hoveredMember === index ? 'z-10' : ''}`}
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative card-glow rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#c5b8a5]/20 transition-all duration-500">
                
                {/* Role Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    member.role === "Leader"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                      : "bg-black/40 backdrop-blur-sm text-[#c5b8a5] border border-white/20"
                  }`}>
                    {member.role}
                  </div>
                </div>

                {/* Member Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => ((e.target as HTMLImageElement).src = fallbackSrc)}
                    draggable={false}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  
                  {/* Skills Tags */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white border border-white/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="h-serif text-xl font-bold text-[#e9dcc8] mb-2 group-hover:text-[#c5b8a5] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#e8e2d9]/60 mb-3 capitalize">{member.major}</p>
                  
                  {/* Description - appears on hover */}
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#e8e2d9]/80 leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      {member.description}
                    </p>
                  </div>
                  
                  {/* Connect Button */}
                  <div className="mt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    <button className="w-full py-2 px-4 bg-gradient-to-r from-[#c5b8a5]/20 to-transparent border border-[#c5b8a5]/30 rounded-lg text-sm text-[#c5b8a5] hover:bg-[#c5b8a5]/10 transition-all duration-300">
                      Kết nối
                    </button>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#c5b8a5]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mouse Follower */}
      <div 
        className="fixed pointer-events-none z-50 w-4 h-4 rounded-full bg-gray-400/30 blur-sm transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: hoveredMember !== null ? 'scale(3)' : 'scale(1)',
        }}
      />
    </div>
  );
};

export default AboutUs;