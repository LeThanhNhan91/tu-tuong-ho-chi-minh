import React, { useState } from 'react';

const FlippingCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        
        .flip-card {
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
        
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        .glow-effect {
          box-shadow: 0 0 30px rgba(120, 113, 108, 0.2);
        }
      `}</style>

      <div className="max-w-lg w-full">
        {/* Card Container */}
        <div 
          className={`flip-card h-[450px] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flip-card-inner">
            
            {/* Front Side - Question */}
            <div className="flip-card-front">
              <div className="h-full bg-stone-800/60 backdrop-blur-md border border-stone-700 rounded-2xl glow-effect">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  
                  {/* Question Icon */}
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center border border-stone-500">
                      <svg className="w-8 h-8 text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Question Title */}
                  <h2 className="text-2xl font-bold text-stone-100 mb-6 text-center" style={{ fontFamily: 'Playfair Display' }}>
                    Câu hỏi thảo luận
                  </h2>

                  {/* Question Text */}
                  <div className="text-stone-200 text-lg leading-relaxed text-center mb-8 space-y-2" style={{ fontFamily: 'Inter' }}>
                    <p className="font-semibold text-stone-300">
                      Tư tưởng độc lập dân tộc của Hồ Chí Minh có điểm gì mới mẻ và sáng tạo so với các tiền nhân?
                    </p>
                    {/* <p>
                      có phải là <span className="font-bold text-stone-100">giai cấp công nhân</span> hay không?
                    </p> */}
                  </div>

                  {/* Click hint */}
                  <div className="flex items-center text-stone-400 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                    Click để xem câu trả lời
                  </div>
                </div>
              </div>
            </div>

            {/* Back Side - Answer */}
            <div className="flip-card-back">
              <div className="h-full bg-stone-800/60 backdrop-blur-md border border-stone-700 rounded-2xl glow-effect">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  
                  {/* Answer Icon */}
                  <div className="mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-stone-600 to-stone-700 rounded-full flex items-center justify-center border border-stone-500">
                      <svg className="w-8 h-8 text-stone-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Answer Title */}
                  <h2 className="text-2xl font-bold text-stone-100 mb-6 text-center" style={{ fontFamily: 'Playfair Display' }}>
                    Câu trả lời
                  </h2>

                  {/* Answer Content */}
                  <div className="text-stone-200 text-base leading-relaxed text-center space-y-4 mb-6" style={{ fontFamily: 'Inter' }}>
                    <p>
                      <span className="font-semibold text-stone-300">Theo quan điểm Marxist</span>, giai cấp được định nghĩa bởi 
                      <span className="font-bold text-stone-100"> mối quan hệ sản xuất</span>.
                    </p>
                    
                    <p>
                      <span className="font-semibold text-stone-300">Bác sĩ, giảng viên, IT</span> hiện nay phần lớn là 
                      <span className="font-bold text-stone-100"> lao động trí thức</span> làm công ăn lương.
                    </p>

                    <p className="font-semibold text-stone-200 bg-stone-700/30 p-4 rounded-lg border border-stone-600 text-center">
                      → Có thể được xem là <span className="text-stone-100">giai cấp công nhân hiện đại</span>, 
                      nhưng với đặc điểm riêng về tri thức và kỹ năng.
                    </p>
                  </div>

                  {/* Back hint */}
                  <div className="flex items-center text-stone-400 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Click để quay lại câu hỏi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-stone-400 text-sm">
            💡 Chủ đề: <span className="text-stone-200 font-medium">Tư tưởng Hồ Chí Minh</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;