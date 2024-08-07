import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import metamask from "../assets/Metamask.svg";

interface LeaderboardEntry {
  place: number;
  user: string;
  gamesPlayed: number;
  totalWins: number;
  winrate: string;
}

function LeaderB() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data: LeaderboardEntry[] = await response.json();
        setLeaderboardData(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sliceAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      <h1 className='font-pressStart m-auto w-fit text-2xl my-5 text-customLightBlue'>LEADERBOARD</h1>
      <div className="relative px-14 py-4 m-auto mb-10 h-[702px] drop-shadow-[11px_11px_#352969] container overflow-auto">
      <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[#3abff8]">
              <th className="text-left p-2">PLACE</th>
              <th className="text-left p-2">USER</th>
              <th className="text-right p-2">GAMES PLAYED</th>
              <th className="text-right p-2">TOTAL WINS</th>
              <th className="text-right p-2">WINRATE</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr key={entry.place} className={index === 0 ? "bg-[#233447]" : "bg-[#040923]"}>
                <td className="p-2">{entry.place === 1 ? 'YOU: ' : ''}{entry.place}</td>
                <td className="p-2 flex items-center">
                <Image
                        className="mr-4 walletsvg"
                        src={metamask}
                        alt="Thunder Icon"
                        width={32}
                        height={32}
                      />
                  {sliceAddress(entry.user)}
                </td>
                <td className="p-2 text-right">{entry.gamesPlayed}</td>
                <td className="p-2 text-right">{entry.totalWins}</td>
                <td className="p-2 text-right">{entry.winrate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderB;