import { Dialog } from "@headlessui/react";
import LineProgress from "@mui/material/LinearProgress";
import { FC } from "react";
import { useLocale } from "../context/locale";

type Props = {
  isOpen: boolean;
  progress: number;
};
export const LoadingDialog: FC<Props> = ({ isOpen, progress }) => {
  const { t } = useLocale();

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="p-12 bg-white rounded-md flex flex-col gap-y-4 items-center overflow-hidden">
          <div className="text-xl">{t.DIALOG_CREATING_TRIP}</div>
          <div className="w-full">
            <LineProgress variant="determinate" sx={{ height: 8, borderRadius: 8 }} value={progress} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
