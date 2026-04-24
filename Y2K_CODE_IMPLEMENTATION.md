# 🎮 Y2K САЙТ — КОД И РЕАЛИЗАЦИЯ

Этот документ содержит готовые примеры кода для внедрения всех предложенных функций.

---

## 📂 СТРУКТУРА ФАЙЛОВ ДЛЯ СОЗДАНИЯ

```
src/
├─ components/
│  ├─ ui/
│  │  ├─ Window.tsx          ← Перетаскиваемое окно
│  │  ├─ Button.tsx          ← Y2K кнопка
│  │  ├─ OptimizedImage.tsx  ← Оптимизированное изображение
│  │  └─ Loader.tsx
│  │
│  ├─ features/
│  │  ├─ Desktop/
│  │  │  ├─ DesktopEnv.tsx   ← Главный компонент
│  │  │  ├─ Icon.tsx         ← Иконка рабочего стола
│  │  │  └─ Taskbar.tsx
│  │  │
│  │  ├─ Chat/
│  │  │  ├─ ChatWindow.tsx
│  │  │  ├─ FriendsList.tsx
│  │  │  └─ MessageBubble.tsx
│  │  │
│  │  ├─ Games/
│  │  │  ├─ Snake.tsx
│  │  │  ├─ Pong.tsx
│  │  │  └─ GameWrapper.tsx
│  │  │
│  │  ├─ Player/
│  │  │  └─ WinampPlayer.tsx
│  │  │
│  │  └─ Effects/
│  │     ├─ GlitchEffect.tsx
│  │     └─ CRTEffect.tsx
│  │
│  └─ common/ (существующие)
│
├─ hooks/
│  ├─ useWindow.ts
│  ├─ useChat.ts
│  ├─ useGame.ts
│  └─ useMouseTrail.ts
│
├─ utils/
│  ├─ constants.ts
│  ├─ animations.ts
│  └─ helpers.ts
│
├─ styles/
│  ├─ effects.css
│  ├─ animations.css
│  └─ desktop.css
│
└─ types/
   ├─ window.ts
   ├─ game.ts
   ├─ chat.ts
   └─ common.ts
```

---

## 🔧 ГОТОВЫЕ КОМПОНЕНТЫ

### 1. CUSTOM HOOKS

#### `src/hooks/useWindow.ts`

```typescript
import { useState, useCallback, useRef } from "react";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  position: WindowPosition;
  size: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export function useWindowState(
  id: string,
  defaultSize: WindowSize = { width: 400, height: 300 },
) {
  const [state, setState] = useState<WindowState>({
    id,
    position: { x: Math.random() * 100 + 50, y: Math.random() * 50 + 50 },
    size: defaultSize,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  });

  const prevPos = useRef<WindowPosition>({ x: 0, y: 0 });

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    prevPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    const deltaX = e.clientX - prevPos.current.x;
    const deltaY = e.clientY - prevPos.current.y;

    setState((prev) => ({
      ...prev,
      position: {
        x: Math.max(
          0,
          Math.min(
            prev.position.x + deltaX,
            window.innerWidth - prev.size.width,
          ),
        ),
        y: Math.max(
          0,
          Math.min(
            prev.position.y + deltaY,
            window.innerHeight - prev.size.height,
          ),
        ),
      },
    }));

    prevPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const toggleMinimize = useCallback(() => {
    setState((prev) => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  const toggleMaximize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isMaximized: !prev.isMaximized,
      size: prev.isMaximized
        ? prev.size
        : { width: window.innerWidth, height: window.innerHeight },
    }));
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isMinimized: true }));
  }, []);

  const focus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      zIndex: Math.max(prev.zIndex, Date.now()),
    }));
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDrag,
    toggleMinimize,
    toggleMaximize,
    close,
    focus,
  };
}
```

#### `src/hooks/useChat.ts`

```typescript
import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export interface Friend {
  id: string;
  name: string;
  status: "online" | "away" | "busy" | "offline";
  avatar?: string;
  autoReply?: string;
}

const AUTO_REPLIES = [
  "Hey! I'm at the library, back in 30min! 💻",
  "Yo! Playing games rn, msg me l8r! 🎮",
  "BUSY - do not disturb! 😎",
  "Away from keyboard... probably eating snacks 🍕",
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [friends] = useState<Friend[]>([
    {
      id: "1",
      name: "CyberChick99",
      status: "online",
      autoReply: AUTO_REPLIES[0],
    },
    { id: "2", name: "PixelDream", status: "away", autoReply: AUTO_REPLIES[1] },
    { id: "3", name: "NeonKid", status: "offline", autoReply: AUTO_REPLIES[2] },
    {
      id: "4",
      name: "GlitchGamer",
      status: "busy",
      autoReply: AUTO_REPLIES[3],
    },
  ]);

  const sendMessage = useCallback(
    (text: string, friendId: string) => {
      const newMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "You",
        text,
        timestamp: new Date(),
        isUser: true,
      };

      setMessages((prev) => [...prev, newMessage]);

      // Симуляция автоответа
      const friend = friends.find((f) => f.id === friendId);
      if (friend?.autoReply && friend.status !== "online") {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: Math.random().toString(),
              sender: friend.name,
              text: friend.autoReply || "...",
              timestamp: new Date(),
              isUser: false,
            },
          ]);
        }, 1000);
      }
    },
    [friends],
  );

  return {
    messages,
    friends,
    sendMessage,
  };
}
```

#### `src/hooks/useGame.ts`

```typescript
import { useState, useCallback } from "react";

export interface GameScore {
  score: number;
  level: number;
  gameOver: boolean;
}

export function useSnakeGame() {
  const [state, setState] = useState<GameScore>({
    score: 0,
    level: 1,
    gameOver: false,
  });

  const reset = useCallback(() => {
    setState({ score: 0, level: 1, gameOver: false });
  }, []);

  const addScore = useCallback((points: number) => {
    setState((prev) => ({
      ...prev,
      score: prev.score + points,
      level: Math.floor((prev.score + points) / 100) + 1,
    }));
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({ ...prev, gameOver: true }));
  }, []);

  return {
    ...state,
    reset,
    addScore,
    endGame,
  };
}
```

---

### 2. UI КОМПОНЕНТЫ

#### `src/components/ui/Window.tsx`

```typescript
import React, { useRef, useState } from 'react';
import { useWindowState } from '../../hooks/useWindow';

interface WindowProps {
  id: string;
  title: string;
  icon?: string;
  onClose?: () => void;
  initialSize?: { width: number; height: number };
  children: React.ReactNode;
  isResizable?: boolean;
  isDraggable?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  onClose,
  initialSize = { width: 400, height: 300 },
  children,
  isResizable = true,
  isDraggable = true,
}) => {
  const windowState = useWindowState(id, initialSize);
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isDraggable && (e.target as HTMLElement).closest('.window-title-bar')) {
      setIsDragging(true);
      windowState.handleDragStart(e);
      windowState.focus();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      windowState.handleDrag(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  if (windowState.isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="fixed bg-gradient-to-b from-[#000080] to-[#1084d7] border-2 border-solid shadow-lg"
      style={{
        left: `${windowState.position.x}px`,
        top: `${windowState.position.y}px`,
        width: `${windowState.size.width}px`,
        height: `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
        borderColor: '#dfdfdf',
        borderImageSource: 'url(data:image/svg+xml)',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div
        className="window-title-bar flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d7] px-2 py-1 cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-1">
          {icon && <span className="text-white text-sm">{icon}</span>}
          <span className="text-white text-sm font-bold">{title}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={windowState.toggleMinimize}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
          >
            _
          </button>
          <button
            onClick={windowState.toggleMaximize}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
          >
            □
          </button>
          <button
            onClick={onClose || windowState.close}
            className="w-6 h-5 bg-gradient-to-b from-[#dfdfdf] to-[#808080] border border-white/50 text-black text-xs hover:bg-gradient-to-b hover:from-[#e8e8e8] hover:to-[#808080]"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#c0c0c0] h-full overflow-auto" style={{ height: `calc(100% - 22px)` }}>
        {children}
      </div>
    </div>
  );
};
```

#### `src/components/ui/OptimizedImage.tsx`

```typescript
import React, { forwardRef, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      srcSet,
      sizes,
      priority = false,
      className = '',
      width,
      height,
      onLoad,
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
    };

    // Генерируем WebP версию если не предоставлена
    const webpSrcSet = srcSet || src.replace(/\.(jpg|png)$/, '.webp');

    return (
      <picture>
        <source
          srcSet={webpSrcSet}
          type="image/webp"
          sizes={sizes}
        />
        <source
          srcSet={srcSet || src}
          type={src.endsWith('.png') ? 'image/png' : 'image/jpeg'}
          sizes={sizes}
        />
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`${className} ${!isLoaded ? 'blur-sm' : ''} transition-all duration-300`}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
        />
      </picture>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';
```

#### `src/components/ui/Button.tsx`

```typescript
import React from 'react';

interface Y2KButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  glitch?: boolean;
}

export const Y2KButton = React.forwardRef<HTMLButtonElement, Y2KButtonProps>(
  ({ variant = 'primary', size = 'md', glitch = false, className = '', ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-cyan-400/20 hover:bg-cyan-400/30 border-cyan-300/50 text-cyan-200',
      secondary: 'bg-purple-400/20 hover:bg-purple-400/30 border-purple-300/50 text-purple-200',
      danger: 'bg-pink-400/20 hover:bg-pink-400/30 border-pink-300/50 text-pink-200',
      success: 'bg-lime-400/20 hover:bg-lime-400/30 border-lime-300/50 text-lime-200',
    };

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={`
          y2k-button rounded-full border uppercase tracking-wide
          transition-all duration-200 cursor-pointer
          active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${glitch ? 'animate-glitch' : ''}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Y2KButton.displayName = 'Y2KButton';
```

---

### 3. FEATURE КОМПОНЕНТЫ

#### `src/components/features/Games/Snake.tsx`

```typescript
import React, { useEffect, useRef, useState } from 'react';
import { useSnakeGame } from '../../../hooks/useGame';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameState = useSnakeGame();
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const GRID_SIZE = 20;
  const TILE_SIZE = 20;

  // Игровой цикл
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  // Основной игровой цикл
  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead: Position = { ...head };

        switch (direction) {
          case 'UP':
            newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'DOWN':
            newHead.y = (newHead.y + 1) % GRID_SIZE;
            break;
          case 'LEFT':
            newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE;
            break;
          case 'RIGHT':
            newHead.x = (newHead.x + 1) % GRID_SIZE;
            break;
        }

        // Проверка столкновения с собой
        if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
          gameState.endGame();
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        // Проверка съедения еды
        if (newHead.x === food.x && newHead.y === food.y) {
          gameState.addScore(10);
          setFood({
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 100);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, food, gameState]);

  // Отрисовка
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Сетка
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * TILE_SIZE, 0);
      ctx.lineTo(i * TILE_SIZE, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * TILE_SIZE);
      ctx.lineTo(canvas.width, i * TILE_SIZE);
      ctx.stroke();
    }

    // Змея
    ctx.fillStyle = '#00ff00';
    snake.forEach(segment => {
      ctx.fillRect(
        segment.x * TILE_SIZE + 1,
        segment.y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2
      );
    });

    // Голова
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(
      snake[0].x * TILE_SIZE + 1,
      snake[0].y * TILE_SIZE + 1,
      TILE_SIZE - 2,
      TILE_SIZE - 2
    );

    // Еда
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
      food.x * TILE_SIZE + 1,
      food.y * TILE_SIZE + 1,
      TILE_SIZE - 2,
      TILE_SIZE - 2
    );
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-[#c0c0c0]">
      <div className="text-sm font-bold">Score: {gameState.score}</div>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * TILE_SIZE}
        height={GRID_SIZE * TILE_SIZE}
        className="border-2 border-black"
        style={{ imageRendering: 'pixelated' }}
      />
      {gameState.gameOver && (
        <div className="text-center">
          <p className="text-red-600 font-bold">GAME OVER!</p>
          <button
            onClick={gameState.reset}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
```

#### `src/components/features/Chat/ChatWindow.tsx`

```typescript
import React, { useState } from 'react';
import { useChat } from '../../../hooks/useChat';
import { Window } from '../../ui/Window';

interface ChatWindowProps {
  friendId: string;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ friendId, onClose }) => {
  const { messages, friends, sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const friend = friends.find(f => f.id === friendId);

  if (!friend) return null;

  const handleSend = () => {
    if (messageText.trim()) {
      sendMessage(messageText, friendId);
      setMessageText('');
    }
  };

  return (
    <Window
      id={`chat-${friendId}`}
      title={friend.name}
      icon="💬"
      onClose={onClose}
      initialSize={{ width: 320, height: 400 }}
    >
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="bg-blue-600 text-white px-3 py-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold">{friend.name}</span>
            <span className={`text-xs ${friend.status === 'online' ? 'text-green-300' : 'text-gray-300'}`}>
              {friend.status === 'online' ? '🟢 Online' : friend.status === 'away' ? '🟡 Away' : '⚫ Offline'}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 bg-white space-y-2">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`text-xs p-2 rounded ${
                msg.isUser
                  ? 'bg-blue-100 text-blue-900 ml-6 text-right'
                  : 'bg-gray-100 text-gray-900 mr-6'
              }`}
            >
              <div className="font-bold text-xs">{msg.sender}</div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-2 bg-gray-100 flex gap-1">
          <input
            type="text"
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 px-2 py-1 text-xs border border-gray-400 rounded"
          />
          <button
            onClick={handleSend}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </Window>
  );
};
```

#### `src/components/features/Player/WinampPlayer.tsx`

```typescript
import React, { useState, useEffect } from 'react';

export const WinampPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [visualization, setVisualization] = useState(Array(20).fill(0));

  // Имитация визуализатора
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setVisualization(prev =>
        prev.map(() => Math.random() * 100)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Имитация времени
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => (prev + 1) % 240);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-80 bg-gradient-to-b from-gray-700 to-gray-600 p-4 rounded-lg border-2 border-gray-500 shadow-lg font-terminator">
      {/* Заголовок */}
      <div className="text-center text-white text-xs font-bold mb-3">
        Winamp Media Player 2.91
      </div>

      {/* Визуализатор */}
      <div className="bg-black mb-3 p-2 flex items-end justify-center gap-1 h-16 rounded">
        {visualization.map((height, i) => (
          <div
            key={i}
            className="bg-lime-500 w-1 transition-all duration-100"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Display */}
      <div className="bg-black text-lime-500 text-center text-sm p-2 mb-3 rounded font-mono">
        {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} / 4:00
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <button
          className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
          title="Previous"
        >
          ⏮
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          className="w-8 h-8 bg-gradient-to-b from-gray-500 to-gray-700 border-2 border-gray-400 text-black text-xs font-bold hover:from-gray-400 hover:to-gray-600 active:from-gray-600 active:to-gray-500"
          title="Next"
        >
          ⏭
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-white text-xs">🔊</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-white text-xs w-8 text-right">{volume}%</span>
      </div>

      {/* Playlist */}
      <div className="text-xs text-white p-2 bg-black/50 rounded max-h-24 overflow-y-auto">
        <div className="font-bold mb-1">Now Playing:</div>
        <div className="text-lime-500">Song Title - Artist Name</div>
        <div className="text-gray-400 text-xs">Album: Greatest Hits</div>
      </div>
    </div>
  );
};
```

---

### 4. ЭФФЕКТЫ

#### `src/components/features/Effects/GlitchEffect.tsx`

```typescript
import React, { useState } from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div
      className={isGlitching ? 'animate-glitch' : ''}
      style={isGlitching ? {
        animation: 'glitch 0.3s',
      } : {}}
    >
      {children}
    </div>
  );
};
```

#### `src/components/features/Effects/CRTEffect.tsx`

```typescript
import React from 'react';

interface CRTEffectProps {
  enabled: boolean;
}

export const CRTEffect: React.FC<CRTEffectProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <>
      {/* Сканирующие линии */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          animation: 'crt-flicker 0.15s infinite',
        }}
      />
      {/* Виньетка */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at center,
              rgba(255, 255, 255, 0) 0%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
        }}
      />
    </>
  );
};
```

---

### 5. CSS АНИМАЦИИ

#### `src/styles/animations.css`

```css
/* Glitch Animation */
@keyframes glitch {
  0%,
  100% {
    text-shadow:
      -2px -2px #ff00ff,
      2px 2px #00ffff;
    transform: translate(0);
  }
  25% {
    text-shadow:
      2px 2px #ff00ff,
      -2px -2px #00ffff;
    transform: translate(2px, 2px);
  }
  50% {
    text-shadow:
      -2px 2px #ff00ff,
      2px -2px #00ffff;
    transform: translate(-2px, -2px);
  }
  75% {
    text-shadow:
      2px -2px #ff00ff,
      -2px 2px #00ffff;
    transform: translate(-2px, 2px);
  }
}

.animate-glitch {
  animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* CRT Flicker */
@keyframes crt-flicker {
  0%,
  100% {
    opacity: 0.97;
  }
  50% {
    opacity: 1;
  }
}

.crt-flicker {
  animation: crt-flicker 0.15s infinite;
}

/* Pulse */
@keyframes soft-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.soft-pulse {
  animation: soft-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Chroma shift */
@keyframes chroma-shift {
  0% {
    text-shadow:
      0 0 10px rgba(125, 249, 255, 0.5),
      0 0 20px rgba(125, 249, 255, 0.3);
  }
  50% {
    text-shadow:
      0 0 10px rgba(255, 89, 209, 0.5),
      0 0 20px rgba(255, 89, 209, 0.3);
  }
  100% {
    text-shadow:
      0 0 10px rgba(125, 249, 255, 0.5),
      0 0 20px rgba(125, 249, 255, 0.3);
  }
}

.chroma-text {
  animation: chroma-shift 3s ease-in-out infinite;
}
```

---

## 🚀 КРАТКАЯ ИНСТРУКЦИЯ ПО ВНЕДРЕНИЮ

1. **Создать папки и файлы** по структуре выше
2. **Скопировать hooks** в `src/hooks/`
3. **Скопировать компоненты** в `src/components/`
4. **Добавить CSS** в `src/styles/`
5. **Обновить `tailwind.config.ts`** с новыми анимациями
6. **Тестировать** каждый компонент отдельно

---

**Автор:** CULTURE Y2K Project  
**Версия:** 1.0  
**Дата:** 24 апреля 2026
