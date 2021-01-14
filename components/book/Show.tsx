import { FunctionComponent } from "react";
import Link from "next/link";
import { Book } from "../../interfaces/Book";

interface Props {
	book: Book;
}

export const Show: FunctionComponent<Props> = ({ book }) => {

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this item ?")) {
			try {
				fetch(`${book["@id"]}`, { method: "delete" });
			} catch (error) {
				console.error(error);
			}
		}
	};

	const reviewsArray = book["reviews"].map((review, index) => (
		<a href={`${review}`} key={index}>
			{review}
			<br />
		</a>
	));

	return (
		<div>
			<h1>Show {book["@id"]}</h1>
			<table className='table table-responsive table-striped table-hover'>
				<thead>
					<tr>
						<th>Field</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope='row'>isbn</th>
						<td>{book["isbn"]}</td>
					</tr>
					<tr>
						<th scope='row'>title</th>
						<td>{book["title"]}</td>
					</tr>
					<tr>
						<th scope='row'>description</th>
						<td>{book["description"]}</td>
					</tr>
					<tr>
						<th scope='row'>author</th>
						<td>{book["author"]}</td>
					</tr>
					<tr>
						<th scope='row'>publicationDate</th>
						<td>{book["publicationDate"]}</td>
					</tr>
					<tr>
						<th scope='row'>reviews</th>
						<td>
							<ul>{reviewsArray}</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<Link href='/books'>
				<a className='btn btn-primary'>Back to list</a>
			</Link>
			<Link href={`${book["@id"]}/edit`}>
				<a className='btn btn-warning'>Edit</a>
			</Link>
			<button className='btn btn-danger' onClick={handleDelete}>
				<a>Delete</a>
			</button>
		</div>
	);
};
