import HTMLFlipBook from "react-pageflip";
import React from "react";
import "./MemoryBookFlip.css";

const PageCover = React.forwardRef(
  ({ children, imgSrc, isFrontCover, studentName, gender }, ref) => {
    const coverColor =
      gender === "female"
        ? "bg-pink-200/90"
        : gender === "male"
        ? "bg-cyan-200/90"
        : "bg-yellow-200/90";
    const textColor =
      gender === "female"
        ? "text-pink-800"
        : gender === "male"
        ? "text-cyan-800"
        : "text-yellow-800";

    const borderColor =
      gender === "female"
        ? "border-pink-400/50"
        : gender === "male"
        ? "border-blue-900"
        : "border-yellow-400/50";

    return (
      <div
        className={`page-cover flex flex-col items-center justify-center p-8 shadow-xl ${coverColor} border-8 border-white rounded-lg`}
        ref={ref}
        data-density="hard"
      >
        <div
          className={`w-full h-full p-4 sm:p-6 md:p-8 bg-white/80 rounded-xl shadow-inner border-dashed border-4 ${borderColor} flex flex-col items-center justify-center`}
        >
          {isFrontCover && imgSrc && (
            <div
              className={`relative mb-6 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[6px] shadow-xl mx-auto 
                  ${
                    gender === "female"
                      ? "border-pink-700 shadow-pink-200/60"
                      : gender === "male"
                      ? "border-cyan-800 shadow-cyan-200/60"
                      : "border-yellow-300 shadow-yellow-200/60"
                  }`}
            >
              <img
                src={imgSrc}
                alt={`${studentName} Profili`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/500x650/cccccc/333333?text=${studentName}`;
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent animate-pulse"></div>
            </div>
          )}

          {isFrontCover ? (
            <>
              <h1
                className={`text-xl sm:text-2xl md:text-4xl font-black text-center mt-8 ${textColor} student-cover-font`}
              >
                {studentName}
              </h1>

              <p className={`text-sm font-medium mt-10 text-gray-700`}>
                Yıldız Tozu Sınıfı Anı Defteri
              </p>
            </>
          ) : (
            // Arka Kapak İçeriği
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <h2
                className={`text-[15px] font-extrabold mb-4 ${textColor} handwriting-font`}
              >
                Öğretmenler Gününüz Kutlu Olsun!
              </h2>

              {/* Not (Sınıfın Minneti) */}
              <p className="text-gray-700 text-base mb-2 max-w-sm">
                Sizi Çok Seviyoruz Öğretmenim
              </p>

              {/* Kalp veya Hediye Vurgusu */}
              <p className={`text-5xl my-4 text-red-500`}>❤️</p>

              {/* İmza ve Tarih */}
              <div className="absolute bottom-20 w-2/3 text-center">
                <p className="text-gray-500 text-sm mt-6 border-t pt-3 border-gray-300">
                  Sevgiyle,
                  <br />
                  Yıldız Tozu Sınıfı
                  <br />
                  24 Kasım 2025
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

const Page = React.forwardRef((props, ref) => (
  <div
    className="page p-0 bg-white shadow-lg border-r border-gray-300"
    ref={ref}
  >
    {props.children}
  </div>
));

const TypingText = ({ text, delay = 50, className }) => {
  const [charIndex, setCharIndex] = React.useState(0);
  const [isTypingComplete, setIsTypingComplete] = React.useState(false);

  React.useEffect(() => {
    if (!text) return;

    setCharIndex(0);
    setIsTypingComplete(false);

    const typingInterval = setInterval(() => {
      setCharIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex > text.length) {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
          return text.length; // Max index'i geri döndür
        }
        return nextIndex; // Yeni index'i geri döndür
      });
    }, delay);

    return () => clearInterval(typingInterval);
  }, [text, delay]);

  const displayedText = text.substring(0, charIndex);

  return (
    <p className={className}>
      {displayedText}
      {!isTypingComplete && <span className="animate-pulse">|</span>}
    </p>
  );
};

export default function MemoryBookFlip({ selectedStudent, pages, onClose }) {
  const coverImage = pages?.[0]?.image;
  const gender = pages?.[0]?.gender;

  const closeButtonClasses =
    "absolute -top-10 right-0 bg-red-900 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-xl hover:bg-red-500 transition-all z-50";

  return (
    <div className="relative w-full flex justify-center">
      <button onClick={onClose} className={closeButtonClasses} title="Kapat">
        &times;
      </button>

      <div className="w-[90vw] sm:w-[80vw] md:w-[700px] lg:w-[1000px] flex justify-center">
        <HTMLFlipBook
          width={350}
          height={500}
          size="stretch"
          minWidth={280}
          maxWidth={800}
          minHeight={380}
          maxHeight={1000}
          flippingTime={900}
          drawShadow={true}
          showCover={true}
          style={{ margin: "0 auto", borderRadius: "12px" }}
          className="album-web my-8"
          mobileScrollSupport={true}
        >
          {/* Ön Kapak */}
          <PageCover
            isFrontCover={true}
            studentName={selectedStudent}
            imgSrc={coverImage}
            gender={gender}
          />

          {/* İç Sayfalar */}
          {pages && pages.length > 0 ? (
            pages.flatMap((page, index) => {
              const rotateClass = `rotate-${(index % 4) + 1}`;

              return [
                <Page key={`img-${index}`} ref={React.createRef()}>
                  <div
                    className="w-full h-full flex items-center justify-center bg-white p-4"
                    style={{
                      // Hafif renkli, yumuşak bir pastel arka plan
                      backgroundColor: "#f9f5ff",
                      // Hafif bir desen ekleyelim (Örn: puantiye veya çizgili)
                      backgroundImage:
                        "radial-gradient(#f0e4ff 1px, transparent 1px), radial-gradient(#f0e4ff 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 10px 10px",
                    }}
                  >
                    <div
                      className={`relative inline-block max-w-[90%] h-[70%] bg-white ${rotateClass} page-image-effect`}
                    >
                      <img
                        src={page.leftImage}
                        alt={`${selectedStudent} Anısı ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </Page>,

                <Page key={`txt-${index}`} ref={React.createRef()}>
                  <div
                    className="p-4 sm:p-6 bg-white h-full flex flex-col justify-between rounded-r-none"
                    style={{
                      backgroundColor: "#f9f5ff",
                      backgroundImage:
                        "radial-gradient(#f0e4ff 1px, transparent 1px), radial-gradient(#f0e4ff 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 10px 10px",
                    }}
                  >
                    <div className="flex-1 flex justify-center items-center">
                      <TypingText
                        text={page.rightText}
                        delay={60}
                        className="text-gray-800 text-sm sm:text-base md:text-lg text-center leading-relaxed whitespace-pre-wrap"
                      />
                    </div>
                    <p
                      className={`text-right text-xs sm:text-sm text-gray-500 mt-4 border-t pt-2 ${
                        gender === "female"
                          ? "border-pink-300"
                          : "border-cyan-300"
                      }`}
                    >
                      {index + 1}
                    </p>
                  </div>
                </Page>,
              ];
            })
          ) : (
            <PageCover isFrontCover={false}>Henüz sayfa yok</PageCover>
          )}

          {/* Arka Kapak */}
          <PageCover isFrontCover={false} gender={gender}></PageCover>
        </HTMLFlipBook>
      </div>
    </div>
  );
}
