"use client";
import React, { useCallback, useEffect, useState } from "react";
import { UIFieldClientProps } from "payload";
import { Button, FieldLabel } from "@payloadcms/ui";
import { buildFrontend } from "@/utils/builds";

import "./index.css";

const COOLDOWN_DURATION = 30000; // 30 seconds
const STORAGE_KEY = "lastRunBuildTime";

export const RunBuildButtonComponent: React.FC<UIFieldClientProps> = ({ field }) => {
    const { label } = field;
    const [lastRunTime, setLastRunTime] = useState<number | null>(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

    const startCooldown = useCallback((initialTime: number) => {
        if (debounceRef.current) return;
        setIsDisabled(true);
        setTimeLeft(initialTime);
        debounceRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (debounceRef.current) clearInterval(debounceRef.current);
                    debounceRef.current = null;
                    setIsDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        const storedTime = localStorage.getItem(STORAGE_KEY);
        if (storedTime) {
            const parsedTime = parseInt(storedTime, 10);
            const elapsedTime = Date.now() - parsedTime;
            if (elapsedTime < COOLDOWN_DURATION) {
                startCooldown(Math.ceil((COOLDOWN_DURATION - elapsedTime) / 1000));
            }
            setLastRunTime(parsedTime);
        }
    }, [startCooldown]);

    const handleClick = useCallback(async () => {
        const currentTime = Date.now();
        localStorage.setItem(STORAGE_KEY, currentTime.toString());
        setLastRunTime(currentTime);
        startCooldown(COOLDOWN_DURATION / 1000);

        await buildFrontend({ force: true });
        console.log("Build finished");
    }, [startCooldown]);

    return (
        <div className="field-type run-build-button-component">
            {label !== "Run Build Button" ? <FieldLabel label={label} /> : null}
            <Button
                className="lock-button"
                buttonStyle="pill"
                disabled={isDisabled}
                onClick={handleClick}
            >
                {isDisabled ? `please wait ${timeLeft}s` : "Run Manual Build"}
            </Button>
        </div>
    );
};
