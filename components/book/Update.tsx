import { FunctionComponent, useState } from "react";
import { Formik } from "formik";
import { Book } from "../../interfaces/Book";
import Link from "next/link";

interface Props {
	book: Book;
}

export const Update: FunctionComponent<Props> = ({ book }) => {
	const [error, setError] = useState(null);

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this item ?")) {
			try {
				fetch(`${book["@id"]}`, { method: "delete" });
			} catch (error) {
				setError(error);
				console.error(error);
			}
		}
	};

	return (
		<div>
			<h1>Edit {book["@id"]}</h1>
			<Formik
				initialValues={{ ...book }}
				validate={(values) => {
					const errors = {};
					//set your validation logic here
				}}
				onSubmit={(values, { setSubmitting, setStatus }) => {
					try {
						fetch(`${book["@id"]}`, {
							method: "put",
							body: JSON.stringify(values),
						});
						setStatus({
							edited: true,
							msg: "Element edited",
						});
					} catch (error) {
						setStatus({
							edited: false,
							msg: `Error ${error}`,
						});
					}
					setSubmitting(false);
				}}
			>
				{({
					values,
					status,
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
								required
							/>
						</div>
						{/* {errors.isbn && touched.isbn && errors.isbn} */}
						<div className='form-group'>
							<label>title</label>
							<input
								className='form-control'
								type='text'
								name='title'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								required
							/>
						</div>
						{/* {errors.title && touched.title && errors.title} */}
						<div className='form-group'>
							<label>description</label>
							<input
								className='form-control'
								type='text'
								name='description'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.description}
								required
							/>
						</div>
						{/* {errors.description && touched.description && errors.description} */}
						<div className='form-group'>
							<label>author</label>
							<input
								className='form-control'
								type='text'
								name='author'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.author}
								required
							/>
						</div>
						{/* {errors.author && touched.author && errors.author} */}
						<div className='form-group'>
							<label>publicationDate</label>
							<input
								className='form-control'
								type='datetime'
								name='publicationDate'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.publicationDate}
								required
							/>
						</div>
						{/* {errors.publicationDate && touched.publicationDate && errors.publicationDate} */}
						<div className='form-group'>
							<label>reviews</label>
							<input
								className='form-control'
								type='string'
								name='reviews'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.reviews}
								required
							/>
						</div>
						{/* {errors.reviews && touched.reviews && errors.reviews} */}

						{status && status.msg && (
							<div
								className={`alert ${
									status.edited ? "alert-success" : "alert-danger"
								}`}
								role='alert'
							>
								{status.msg}
							</div>
						)}

						{error && (
							<div className='alert alert-danger' role='alert'>
								{error}
							</div>
						)}

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
