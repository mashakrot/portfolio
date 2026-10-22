
export default function RoomDecor() {
  return (
    <div className="room-decor" aria-label="Decorations around the game">
      {/* 1. Window with animated clouds */}
      <div className="room-window" aria-hidden="true">
        <div className="window-sky">
          <span className="pixel-sun" />
          <span className="pixel-cloud cloud-one" />
          <span className="pixel-cloud cloud-two" />
          <span className="window-hill" />
        </div>
        <div className="window-cross vertical" />
        <div className="window-cross horizontal" />
        <div className="window-sill" />
      </div>

      {/* 2. Bookshelf */}
      <div className="room-bookshelf" aria-hidden="true">
        <div className="shelf-books">
          <span className="book book-green" />
          <span className="book book-red" />
          <span className="book book-cream" />
          <span className="book book-brown" />
          <span className="book book-green short" />
        </div>
        <div className="shelf-board" />
        <div className="shelf-books second-row">
          <span className="book book-cream short" />
          <span className="book book-red" />
          <span className="book book-green" />
          <span className="book book-brown short" />
        </div>
        <div className="shelf-board" />
        <div className="shelf-base" />
      </div>

      {/* 3. Potted plant */}
      <div className="room-plant" aria-hidden="true">
        <div className="plant-leaves">
          <span className="leaf leaf-one" />
          <span className="leaf leaf-two" />
          <span className="leaf leaf-three" />
          <span className="leaf leaf-four" />
          <span className="leaf leaf-five" />
        </div>
        <div className="plant-stem" />
        <div className="plant-pot" />
      </div>

      {/* 4. Wall poster */}
      <div className="room-poster" aria-hidden="true">
        <div className="poster-art">
          <span>Ma</span>
          <span className="poster-accent">.Kro</span>
        </div>
        <span className="poster-caption">BUILD · PLAY · CREATE</span>
      </div>

      {/* 5. Floating movement hint */}
      <div className="room-movement-hint" aria-hidden="true">
        <span className="hint-dot" />
        WASD / ARROWS TO MOVE
      </div>
    </div>
  )
}
