interface Props {
	children: string;
}

const Error = ({ children }: Props) => {
	return <div>Error: {children}</div>;
};

export default Error;
