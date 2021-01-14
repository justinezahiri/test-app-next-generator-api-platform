import { NextComponentType, NextPageContext } from 'next';
import { Update } from '../../../components/book/Update';
import { Book } from '../../../interfaces/Book';
import { fetch } from '../../../utils/dataAccess';

interface Props {
  book: Book;
};

const Page: NextComponentType<NextPageContext, Props, Props> = ({ book }) => {

  return (
    <Update book={ book }/>
  );
};

Page.getInitialProps = async ({ asPath }: NextPageContext) => {
  const book = await fetch(asPath.replace( '/edit', ''));

  return { book };
};

export default Page;
