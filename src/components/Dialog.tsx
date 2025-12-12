import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface IDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: React.ReactNode;
}

export default function Dialog({ isOpen, onOpenChange, title, children }: IDialogProps) {
	return (
		<RadixDialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<RadixDialog.Portal>
				<RadixDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
				<RadixDialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-700 bg-gray-800 p-6 rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
					<div className="flex items-center justify-between">
						<RadixDialog.Title className="text-2xl font-bold text-white">{title}</RadixDialog.Title>
						<RadixDialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
							<X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
							<span className="sr-only">Close</span>
						</RadixDialog.Close>
					</div>
					{children}
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	);
}
