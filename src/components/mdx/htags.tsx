export function CustomButton({ children, onClick }: any) {
    return (
        <div
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={onClick}
        >
        {children}
        </div>
);
}