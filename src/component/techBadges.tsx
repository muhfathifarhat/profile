    const badges = [
    'Excel',
    'MySQL',
    'Tableau',
    'PowerBI',
    'Python',
    ];

    export default function TechBadges() {
    return (
        <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
            <span
            key={badge}
            className="px-3 py-1 rounded-full border border-[#383838] bg-[#232323b3] text-[#8e8e8e] text-xs font-mono tracking-wide"
            >
            {badge}
            </span>
        ))}
        </div>
    );
    }