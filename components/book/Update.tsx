import React from "react";
import { FunctionComponent } from "react";
import { Formik } from "formik";
import { Book } from "../../interfaces/Book";
import Link from "next/link";

interface Props {
	book: Book;
}

export const Update: FunctionComponent<Props> = ({ book }) => {
	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this item ?")) {
			try {
				fetch(`${book["@id"]}`, { method: "delete" });
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div>
			<h1>Edit {book["@id"]}</h1>
			<Formik
				initialValues={{
					isbn: book.isbn,
					title: book.title,
					description: book.description,
					author: book.author,
					publicationDate: book.publicationDate,
					reviews: book.reviews,
				}}
				// TODO voir si pertinent de laisser la validation ?
				validate={(values) => {
					const errors = {};
					if (!values.isbn) {
						errors.isbn = "Required";
					}
					if (!values.title) {
						errors.title = "Required";
					}
					if (!values.description) {
						errors.description = "Required";
					}
					if (!values.author) {
						errors.author = "Required";
					}
					if (!values.publicationDate) {
						errors.publicationDate = "Required";
					}
					if (!values.reviews) {
						errors.reviews = "Required";
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting }) => {
					try {
						fetch(`${book["@id"]}`, {
							method: "put",
							body: JSON.stringify(values),
						});
					} catch (error) {
						console.error(error);
					}
					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<div className='form-group'>
							<label>isbn</label>
							<input
								className='form-control'
								type='text'
								name='isbn'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.isbn}
							/>
							{errors.isbn && touched.isbn && errors.isbn}
						</div>
						<div className='form-group'>
							<label>title</label>
							<input
								className='form-control'
								type='text'
								name='title'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
							/>
							{errors.title && touched.title && errors.title}
						</div>
						<div className='form-group'>
							<label>description</label>
							<input
								className='form-control'
								type='text'
								name='description'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
							/>
							{errors.description && touched.description && errors.description}
						</div>
						<div className='form-group'>
							<label>author</label>
							<input
								className='form-control'
								type='text'
								name='author'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.author}
							/>
							{errors.author && touched.author && errors.author}
						</div>
						<div className='form-group'>
							<label>publicationDate</label>
							<input
								className='form-control'
								type='datetime'
								name='publicationDate'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.publicationDate}
							/>
							{errors.publicationDate &&
								touched.publicationDate &&
								errors.publicationDate}
						</div>
						<div className='form-group'>
							<label>reviews</label>
							<input
								className='form-control'
								type='string'
								name='reviews'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.reviews}
							/>
							{errors.reviews && touched.reviews && errors.reviews}
						</div>

						<button
							type='submit'
							className='btn btn-success'
							disabled={isSubmitting}
						>
							Submit
						</button>
					</form>
				)}
			</Formik>
			<Link href='/books'>
				<a className='btn btn-primary'>Back to list</a>
			</Link>
			<button className='btn btn-danger' onClick={handleDelete}>
				<a>Delete</a>
			</button>
		</div>
	);
};

export default Update;
