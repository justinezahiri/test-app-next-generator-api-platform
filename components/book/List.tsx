import React, { FunctionComponent } from "react";
import { ReferenceLinks } from "../common/ReferenceLinks";
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
					books.map((book) => (
						<tr key={book["@id"]}>
							<th scope='row'>
								<ReferenceLinks items={book["@id"]} type='book' />
							</th>
							<td>{book["isbn"]}</td>
							<td>{book["title"]}</td>
							<td>{book["description"]}</td>
							<td>{book["author"]}</td>
							<td>{book["publicationDate"]}</td>
							<td>
								<ul>
									{book["reviews"].map((review, index) => (
										<li key={index}>
											<a href={`${review}`}>
												{review}
												<br />
											</a>
										</li>
									))}
								</ul>
							</td>
							<td>
								<ReferenceLinks
									items={book["@id"]}
									type='book'
									useIcon={true}
								/>
								<br />
								<Link href={`${book["@id"]}/edit`}>
									<a>
										<span className='fa fa-pencil' aria-hidden='true' />
										<span className='sr-only'>Edit</span>
									</a>
								</Link>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	</div>
);
