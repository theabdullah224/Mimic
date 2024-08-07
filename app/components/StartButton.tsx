"use client";
import React from "react";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
function StartButton() {
  const router = useRouter();

  const handleOnStartClick = useCallback(() => {
    router.push("/chatscreen");
  }, [router]);

  return (
    <div className="my-5 mb-16">
      <div className="startbtn relative hover:cursor-pointer   px-14 py-3 drop-shadow-[11px_11px_#00D0FF] container hover:shadow-none">
        <div
          onClick={handleOnStartClick}
          className="insidebtn flex  items-center relative z-10 text-white content"
        >
          <h1 className="text-3xl font-cutefont">PRESS&nbsp;START</h1>
        </div>
        <style jsx>{`
          .container::before,
          .container::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            clip-path: polygon(
              11px 0px,
              11px 2.2px,
              8.8px 2.2px,
              8.8px 4.4px,
              6.6px 4.4px,
              6.6px 6.6px,
              4.4px 6.6px,
              4.4px 8.8px,
              2.2px 8.8px,
              2.2px 11px,
              0px 11px,
              0px calc(100% - 11px),
              2.2px calc(100% - 11px),
              2.2px calc(100% - 8.8px),
              4.4px calc(100% - 8.8px),
              4.4px calc(100% - 6.6px),
              6.6px calc(100% - 6.6px),
              6.6px calc(100% - 4.4px),
              8.8px calc(100% - 4.4px),
              8.8px calc(100% - 2.2px),
              11px calc(100% - 2.2px),
              11px 100%,
              calc(100% - 11px) 100%,
              calc(100% - 11px) calc(100% - 2.2px),
              calc(100% - 8.8px) calc(100% - 2.2px),
              calc(100% - 8.8px) calc(100% - 4.4px),
              calc(100% - 6.6px) calc(100% - 4.4px),
              calc(100% - 6.6px) calc(100% - 6.6px),
              calc(100% - 4.4px) calc(100% - 6.6px),
              calc(100% - 4.4px) calc(100% - 8.8px),
              calc(100% - 2.2px) calc(100% - 8.8px),
              calc(100% - 2.2px) calc(100% - 11px),
              100% calc(100% - 11px),
              100% 11px,
              calc(100% - 2.2px) 11px,
              calc(100% - 2.2px) 8.8px,
              calc(100% - 4.4px) 8.8px,
              calc(100% - 4.4px) 6.6px,
              calc(100% - 6.6px) 6.6px,
              calc(100% - 6.6px) 4.4px,
              calc(100% - 8.8px) 4.4px,
              calc(100% - 8.8px) 2.2px,
              calc(100% - 11px) 2.2px,
              calc(100% - 11px) 0px
            );
          }

          .container::before {
            background-color: #00d0ff;
            z-index: -2;
          }

          .container::after {
            background-color: #040923;
            inset: 1px;
            z-index: -1;
          }
          .startbtn:hover {
            filter: drop-shadow(0px 0px transparent);
            -webkit-filter: drop-shadow(0px 0px transparent);
            position: relative;
            top: 11px;
            left: 11px;

            /* background-color: #00D0FF; */
            color: #00d0ff !important;
            .insidebtn {
              color: #00d0ff !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default StartButton;
