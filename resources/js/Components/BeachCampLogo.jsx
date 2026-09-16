import React from 'react';

export default function BeachCampLogo({ className = "h-9 w-auto", showText = true, textColor = "text-brand-text" }) {
    return (
        <div className="flex items-center gap-2.5 select-none">
            <svg 
                className={className} 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Sunset Sun */}
                <circle cx="24" cy="22" r="14" fill="#F6F3C2" stroke="#E37434" strokeWidth="2.5" />
                
                {/* Sun Glow Rays */}
                <path d="M24 4V7" stroke="#E37434" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M11 11L13.5 13.5" stroke="#E37434" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M37 11L34.5 13.5" stroke="#E37434" strokeWidth="2.5" strokeLinecap="round" />

                {/* Ocean Waves */}
                <path 
                    d="M4 36C9 34 14 38 19 36C24 34 29 38 34 36C39 34 44 37 46 38" 
                    stroke="#1F6E63" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                />
                
                {/* Camping Tent */}
                <path 
                    d="M24 16L36 34H12L24 16Z" 
                    fill="#E37434" 
                    stroke="#B85723" 
                    strokeWidth="2" 
                    strokeLinejoin="round" 
                />
                {/* Tent Entrance */}
                <path 
                    d="M24 22L30 34H18L24 22Z" 
                    fill="#FFFBF2" 
                    stroke="#B85723" 
                    strokeWidth="1.5" 
                />
            </svg>

            {showText && (
                <div className="flex flex-col text-left">
                    <span className={`font-display font-bold text-xl tracking-tight leading-none ${textColor}`}>
                        BEACH <span className="text-brand-primary">CAMP</span>
                    </span>
                    <span className="text-[10px] font-medium tracking-widest uppercase text-brand-text-muted">
                        Coastal Camping
                    </span>
                </div>
            )}
        </div>
    );
}
