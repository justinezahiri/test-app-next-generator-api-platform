import { NextComponentType, NextPageContext } from "next";
import { List } from "../../components/book/List";
import { PagedCollection } from "../../interfaces/Collection";
import { Book } from "../../interfaces/Book";
import { fetch } from "../../utils/dataAccess";

interface Props {
	collection: PagedCollection<Book>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
	collection,
}) => <List books={collection["hydra:member"]} />;

Page.getInitialProps = async () => {
	const collection = await fetch("/books");

	return { collection };
};

export default Page;
