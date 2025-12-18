type FormTitleProps = {
	title: string;
};

export default function FormTitle({ title }: FormTitleProps) {
	return <h2 className="text-center text-2xl font-bold">{title}</h2>;
}
