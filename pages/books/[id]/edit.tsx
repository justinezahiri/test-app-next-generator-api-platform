import { NextComponentType, NextPageContext } from "next";
import { Book } from "../../../interfaces/Book";
import { fetch } from "../../../utils/dataAccess";
import { Form } from "../../../components/book/Form";

interface Props {
	book: Book;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({ book }) => {
	return <Form book={book} />;
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
	const book = await fetch(asPath.replace("/edit", ""));

	return { book };
};

export default Page;
