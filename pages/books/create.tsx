import { NextComponentType, NextPageContext } from 'next';
import { Create } from '../../components/book/Create';

const Page: NextComponentType<NextPageContext> = () => (
  <Create />
);

export default Page;
