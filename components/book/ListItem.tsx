import { FunctionComponent } from "react";
import { Book } from "../../interfaces/Book";
import { ReferenceLinks } from "../common/ReferenceLinks";
import Link from "next/link";

interface Props {
	book: Book;
}

export const ListItem: FunctionComponent<Props> = ({ book }: Props) => {

	const reviewsArray = book["reviews"].map((review, index) => (
		<a href={`${review}`} key={index}>
			{review}
			<br />
		</a>
	));

	return (
		<tr>
			<th scope='row'>
				<ReferenceLinks items={book["@id"]} type='book' />
			</th>
			<td>{book["isbn"]}</td>
			<td>{book["title"]}</td>
			<td>{book["description"]}</td>
			<td>{book["author"]}</td>
			<td>{book["publicationDate"]}</td>
			<td>
				<ul>{reviewsArray}</ul>
			</td>
			<td>
				<ReferenceLinks items={book["@id"]} type='book' useIcon={true} />
				<br />
				<Link href={`${book["@id"]}/edit`}>
					<a>
						<span className='fa fa-pencil' aria-hidden='true' />
						<span className='sr-only'>Edit</span>
					</a>
				</Link>
			</td>
		</tr>
	);
};
