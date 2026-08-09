import { useState, useEffect, useRef } from 'react';

const FUNNY_ACTIONS = [
  { emoji: '👀', label: 'peekingEyes', msg: 'Psst!' },
  { emoji: '🙈', label: 'hiding', msg: 'You saw nothing...' },
  { emoji: '🤫', label: 'shush', msg: 'Shh!' },
  { emoji: '😂', label: 'laughing', msg: 'heh heh heh' },
  { emoji: '🏃', label: 'running', msg: 'Catch me!' },
  { emoji: '😴', label: 'sleeping', msg: 'zzz...' },
  { emoji: '🎉', label: 'party', msg: 'woot!' },
  { emoji: '🤩', label: 'starstruck', msg: 'Cool portfolio!' },
  { emoji: '🫣', label: 'peek', msg: "I see you!" },
  { emoji: '🥷', label: 'ninja', msg: '...' },
];

// Edges of the portfolio canvas where the character peeks from
const PEEK_POSITIONS = [
  { side: 'top',    style: { top: '-20px',   left: '50%',   transform: 'translateX(-50%)' } },
  { side: 'bottom', style: { bottom: '-20px', left: '30%',  transform: 'translateX(-50%)' } },
  { side: 'bottom', style: { bottom: '-20px', left: '70%',  transform: 'translateX(-50%)' } },
  { side: 'left',   style: { left: '-22px',   top: '25%',   transform: 'translateY(-50%)' } },
  { side: 'left',   style: { left: '-22px',   top: '60%',   transform: 'translateY(-50%)' } },
  { side: 'right',  style: { right: '-22px',  top: '35%',   transform: 'translateY(-50%)' } },
  { side: 'right',  style: { right: '-22px',  top: '75%',   transform: 'translateY(-50%)' } },
  { side: 'top',    style: { top: '-20px',    left: '20%',  transform: 'translateX(-50%)' } },
  { side: 'top',    style: { top: '-20px',    left: '80%',  transform: 'translateX(-50%)' } },
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function HideAndSeekCharacter() {
  const [visible, setVisible] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [position, setPosition] = useState(PEEK_POSITIONS[0]);
  const [action, setAction] = useState(FUNNY_ACTIONS[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const peek = () => {
    const newPos = randomFrom(PEEK_POSITIONS);
    const newAction = randomFrom(FUNNY_ACTIONS);
    setPosition(newPos);
    setAction(newAction);
    setVisible(true);
    setShaking(false);
    setShowBubble(false);
    setClicked(false);

    // After a short delay, show speech bubble
    timeoutRef.current = setTimeout(() => {
      setShowBubble(true);
    }, 600);

    // Hide after 2.5-4.5s
    const peekDuration = 2500 + Math.random() * 2000;
    timeoutRef.current = setTimeout(() => {
      setShowBubble(false);
      setVisible(false);

      // Schedule next peek: 4-9 seconds later
      const nextPeek = 4000 + Math.random() * 5000;
      timeoutRef.current = setTimeout(peek, nextPeek);
    }, peekDuration);
  };

  useEffect(() => {
    // First appearance after 3 seconds
    timeoutRef.current = setTimeout(peek, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setShaking(true);
    setAction({ emoji: '😱', label: 'caught', msg: 'YOU CAUGHT ME!' });
    setShowBubble(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Run away after being caught
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setShaking(false);
      const nextPeek = 5000 + Math.random() * 4000;
      timeoutRef.current = setTimeout(peek, nextPeek);
    }, 1500);
  };

  return (
    <div
      id="hide-seek-char"
      onClick={handleClick}
      style={{
        position: 'absolute',
        zIndex: 50,
        cursor: 'pointer',
        userSelect: 'none',
        transition: visible
          ? 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'opacity 0.25s ease, transform 0.25s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        ...position.style,
      }}
      title="Catch me if you can!"
    >
      {/* Character body */}
      <div
        style={{
          width: '44px',
          height: '44px',
          background: '#FFDE4D',
          border: '3px solid #1e1e1e',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          boxShadow: '3px 3px 0px #1e1e1e',
          animation: visible
            ? (shaking ? 'charShake 0.15s ease infinite' : 'charBounce 0.7s ease infinite alternate')
            : 'none',
          transition: 'transform 0.2s ease',
          transform: visible ? 'scale(1)' : 'scale(0.4)',
        }}
      >
        {action.emoji}
      </div>

      {/* Speech bubble */}
      {showBubble && (
        <div
          style={{
            position: 'absolute',
            background: '#ffffff',
            border: '2.5px solid #1e1e1e',
            borderRadius: '10px',
            boxShadow: '3px 3px 0px #1e1e1e',
            padding: '5px 10px',
            whiteSpace: 'nowrap',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: '0.78rem',
            color: '#1e1e1e',
            // top/bottom sides: bubble appears below or above, centered on character
            ...(position.side === 'top' && {
              bottom: '-42px',
              left: '50%',
              transform: 'translateX(-50%)',
            }),
            ...(position.side === 'bottom' && {
              top: '-42px',
              left: '50%',
              transform: 'translateX(-50%)',
            }),
            // left side: bubble appears to the RIGHT (inside canvas)
            ...(position.side === 'left' && {
              top: '50%',
              left: '52px',
              transform: 'translateY(-50%)',
            }),
            // right side: bubble appears to the LEFT (inside canvas)
            ...(position.side === 'right' && {
              top: '50%',
              right: '52px',
              transform: 'translateY(-50%)',
            }),
            animation: 'bubblePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {action.msg}
        </div>
      )}

      <style>{`
        @keyframes charBounce {
          0%   { transform: scale(1) translateY(0px); }
          100% { transform: scale(1.06) translateY(-4px); }
        }
        @keyframes charShake {
          0%   { transform: scale(1.1) translateX(-3px) rotate(-5deg); }
          50%  { transform: scale(1.1) translateX(3px) rotate(5deg); }
          100% { transform: scale(1.1) translateX(-3px) rotate(-5deg); }
        }
        @keyframes bubblePop {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default HideAndSeekCharacter;
