"use client";

import { Appbar } from "@/app/components/Appbar";
import { PrimaryButton } from "@/app/components/buttons/primaryBtn";
import { ZapCell } from "@/app/components/zapCell";
import { BACKEND_URL } from "@/app/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    return {
        availableActions,
        availableTriggers
    }
}

export default function() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return <div>
        <Appbar />
        <div className="flex justify-end bg-slate-200 p-4">
            <PrimaryButton onClick={async () => {
                if (!selectedTrigger?.id) {
                    return;
                }

                const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                    "availableTriggerId": selectedTrigger.id,
                    "triggerMetadata": {},
                    "actions": selectedActions.map(a => ({
                        availableActionId: a.availableActionId,
                        actionMetadata: a.metadata
                    }))
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })
                
                router.push("/dashboard");

            }}>Publish</PrimaryButton>
        </div>
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
                <ZapCell onClick={() => {
                    setSelectedModalIndex(1);
                }} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
            </div>
            <div className="w-full pt-2 pb-2">
                {selectedActions.map((action, index) => <div className="pt-2 flex justify-center"> <ZapCell onClick={() => {
                    setSelectedModalIndex(action.index);
                }} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} /> </div>)}
            </div>
            <div className="flex justify-center">
                <div>
                    <PrimaryButton onClick={() => {
                        setSelectedActions(a => [...a, {
                            index: a.length + 2,
                            availableActionId: "",
                            availableActionName: "",
                            metadata: {}
                        }])
                    }}><div className="text-2xl">
                        +
                    </div></PrimaryButton>
                </div>
            </div>
        </div>
        
    </div>
}