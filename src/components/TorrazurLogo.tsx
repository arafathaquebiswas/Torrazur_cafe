import React from 'react';

interface TorrazurLogoProps {
  variant?: 'light' | 'dark' | 'burgundy';
  showSlogan?: boolean;
  className?: string;
}

export const TorrazurLogo: React.FC<TorrazurLogoProps> = ({
  variant = 'light',
  showSlogan = true,
  className = 'h-12',
}) => {
  // Color presets
  // light = cream/white for dark background headers
  // dark = dark charcoal/burgundy for light background pages
  // burgundy = authentic dark burgundy (#5B1414) as in the official branding
  const primaryColor =
    variant === 'light'
      ? '#FAF6F0'
      : variant === 'burgundy'
      ? '#5B1414'
      : '#24140C';

  const accentColor =
    variant === 'light'
      ? '#C88A4B'
      : variant === 'burgundy'
      ? '#5B1414'
      : '#8C4820';

  const sloganColor =
    variant === 'light'
      ? '#D8C7B5'
      : variant === 'burgundy'
      ? '#5B1414'
      : '#4A3428';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        {/* Calligraphic TORRAZUR Main Wordmark Paths */}
        <g fill={primaryColor}>
          {/* T with sweeping calligraphic top flourish */}
          <path d="M42 41.5C33 46 22 52 18 56C14.5 59.5 16 63 21 60C26 57 39 46.5 49 43C42 55 35 73 37 84C38.5 92 45 97 50 92C55 87 53 78 48 68C45 62 47 51 52 42.5C65 39 88 34 105 27.5C118 22.5 127 18 123 15.5C119 13 103 18 84 24C65 30 46 38 42 41.5Z" />
          
          {/* O with inner swirl */}
          <path d="M84 62C72 62 65 73 67 84C69 95 82 100 95 95C108 90 114 78 111 67C108 56 96 62 84 62ZM90 89C82 91 74 87 73 80C72 73 78 68 85 68C93 68 98 74 97 81C96 85 93 88 90 89Z" />
          <path d="M82 74C82 70 88 70 89 74C90 78 85 81 81 80C79 79 78 75 80 73C82 71 85 73 85 75" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />

          {/* R 1 */}
          <path d="M120 54C118 64 116 80 118 92C119 96 123 96 124 92C126 84 128 72 133 64C137 58 147 52 153 58C158 63 153 71 146 76C140 80 133 82 131 84C138 88 147 92 154 94C157 95 159 93 156 90C150 86 142 81 137 77C146 71 157 60 149 51C141 42 127 47 120 54Z" />

          {/* R 2 */}
          <path d="M162 52C160 62 158 78 160 90C161 94 165 94 166 90C168 82 170 70 175 62C179 56 189 50 195 56C200 61 195 69 188 74C182 78 175 80 173 82C180 86 189 90 196 92C199 93 201 91 198 88C192 84 184 79 179 75C188 69 199 58 191 49C183 40 169 45 162 52Z" />

          {/* A */}
          <path d="M218 48C210 58 202 78 198 90C197 93 201 94 204 90C209 82 215 68 221 57C226 65 231 78 234 90C235 94 239 94 239 89C235 76 228 58 223 48C222 46 219 46 218 48ZM210 76C216 76 223 75 227 74C225 70 221 63 218 58C215 64 212 71 210 76Z" />

          {/* Z */}
          <path d="M242 46C258 45 277 44 286 42C291 41 292 45 285 49C268 60 252 75 239 92C237 95 241 96 248 95C262 93 280 89 292 86C296 85 294 81 289 82C276 85 258 88 247 89C262 72 278 57 293 46C298 42 293 39 283 40C268 42 249 43 241 43C238 43 239 46 242 46Z" />

          {/* U */}
          <path d="M301 48C299 58 296 73 300 82C304 90 316 92 324 88C332 84 336 74 338 62C340 52 342 45 345 42C342 42 338 48 336 58C333 71 328 82 321 84C314 86 307 83 305 76C302 69 304 56 307 48C308 45 304 45 301 48Z" />

          {/* R 3 */}
          <path d="M349 46C347 56 345 72 347 84C348 88 352 88 353 84C355 76 357 64 362 56C366 50 376 44 382 50C387 55 382 63 375 68C369 72 362 74 360 76C367 80 376 84 383 86C386 87 388 85 385 82C379 78 371 73 366 69C375 63 386 52 378 43C370 34 356 39 349 46Z" />
        </g>

        {/* Dynamic Sweeping Underline Flourish Arc */}
        <path
          d="M110 98 C180 106, 280 102, 395 125 C340 112, 220 104, 110 98 Z"
          fill={accentColor}
        />

        {/* Slogan Text: BAKE ROAST BREW */}
        {showSlogan && (
          <text
            x="245"
            y="126"
            fill={sloganColor}
            fontSize="12"
            fontWeight="600"
            letterSpacing="0.32em"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          >
            BAKE ROAST BREW
          </text>
        )}
      </svg>
    </div>
  );
};
