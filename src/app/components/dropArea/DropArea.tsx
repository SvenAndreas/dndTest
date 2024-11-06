"use client";

import { useState } from "react";

function DropArea({ onDrop }: { onDrop?: () => void }) {
  const [showDrop, setShowDrop] = useState(false);
  const dropShow =
    "w-full h-40 border-1 mb-2  rounded-md p-4 opacity-1 bg-red-200 transition-all duration-300";
  const dropHide = " opacity-0";
  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => {
        onDrop && onDrop();
        setShowDrop(false);
      }}
      className={`${showDrop ? dropShow : dropHide}`}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
    >
      drop
    </section>
  );
}

export default DropArea;
