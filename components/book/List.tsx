import { FunctionComponent } from "react";
import { ListItem } from "./ListItem";
import { Book } from "../../interfaces/Book";
import Link from "next/link";

interface Props {
	books: Book[];
}

export const List: FunctionComponent<Props> = ({ books }) => (
	<div>
		<h1>Book List</h1>
		<Link href='books/create'>
			<a className='btn btn-primary'>Create</a>
		</Link>
		<table className='table table-responsive table-striped table-hover'>
			<thead>
				<tr>
					<th>id</th>
					<th>isbn</th>
					<th>title</th>
					<th>description</th>
					<th>author</th>
					<th>publicationDate</th>
					<th>reviews</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{books &&
					books.length !== 0 &&
					books.map((book) => <ListItem key={book["@id"]} book={book} />)}
			</tbody>
		</table>
	</div>
);
