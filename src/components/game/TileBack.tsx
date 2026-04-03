function TileBack() {
  return (
    <div
      className="w-25 h-35 rounded-[14px] 
                    bg-[#1a3a1a] border border-[#2d5a2d]
                    flex items-center justify-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #1f421f 0px, #1f421f 2px, #1a3a1a 2px, #1a3a1a 10px)",
      }}
    >
      <div
        className="w-13.5 h-19.5 rounded-lg 
                      border border-[#2d5a2d]/50 
                      flex items-center justify-center"
      >
        <span className="text-2xl" style={{ color: "#c84b2f" }}>
          中
        </span>
      </div>
    </div>
  );
}

export default TileBack;
