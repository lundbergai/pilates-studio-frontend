import * as Dialog from "@radix-ui/react-dialog";
import { X, Loader } from "lucide-react";

interface IFormDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	children: React.ReactNode;
	onSubmit?: (e: React.FormEvent) => void;
	onCancel?: () => void;
	isLoading?: boolean;
	submitLabel?: string;
	cancelLabel?: string;
}

export default function FormDialog({
	isOpen,
	onOpenChange,
	title,
	children,
	onSubmit,
	onCancel,
	isLoading = false,
	submitLabel = "Save",
	cancelLabel = "Cancel"
}: IFormDialogProps) {
	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
				<Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-700 bg-gray-800 p-6 rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-2xl font-bold text-white">{title}</Dialog.Title>
						<Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
							<X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
							<span className="sr-only">Close</span>
						</Dialog.Close>
					</div>

					{onSubmit ? (
						<form onSubmit={onSubmit} className="space-y-4">
							{children}

							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={onCancel}
									className="flex-1 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 text-white"
									disabled={isLoading}
								>
									{cancelLabel}
								</button>
								<button
									type="submit"
									className="flex-1 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 text-white"
									disabled={isLoading}
								>
									{isLoading && <Loader size={16} className="animate-spin" />}
									{isLoading ? `${submitLabel}ing...` : submitLabel}
								</button>
							</div>
						</form>
					) : (
						children
					)}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
