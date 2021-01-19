import React from "react";
import { FunctionComponent } from "react";
import { Formik } from "formik";
import { Book } from "../../interfaces/Book";
import Link from "next/link";

interface Props {
	book?: Book;
}

export const Form: FunctionComponent<Props> = ({ book }) => {

  const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this item ?")) {
			try {
				fetch(`${book["@id"]}`, { method: "delete" });
			} catch (error) {
				alert("error when delete element");
				console.error(error);
			}
		}
	};

	const defaultValues = () => {
    console.log("book", book)
    if (book["@id"] !== undefined) {
      return
      ({ ...book })
    }
    else {
      return ({
        isbn: "",
        title: "",
        description: "",
        author: "",
        publicationDate: "",
        reviews: "",
      })
    }
  }

	return (
		<div>
			{book["@id"] ? <h1>Edit {book["@id"]}</h1> : <h1>Create</h1>}
			<Formik
				initialValues={defaultValues()}
				validate={(values) => {
					const errors = {};
					//set your validation logic here
				}}
				onSubmit={(values, { setSubmitting, setStatus }) => {
					if (!book["@id"]) {
						try {
							fetch("/books", {
								method: "post",
								body: JSON.stringify(values),
							});
							setStatus({
								isValid: true,
								msg: "Element created",
							});
						} catch (error) {
							setStatus({
								isValid: false,
								msg: `Error ${error}`,
							});
						}
					} else {
						try {
							fetch(`${book["@id"]}`, {
								method: "put",
								body: JSON.stringify(values),
							});
							setStatus({
								isValid: true,
								msg: "Element edited",
							});
						} catch (error) {
							setStatus({
								isValid: false,
								msg: `Error ${error}`,
							});
						}
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
									status.isValid ? "alert-success" : "alert-danger"
								}`}
								role='alert'
							>
								{status.msg}
							</div>
						)}

              {/* { error && <div className="alert">{error}</div> } */}

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
			{book["@id"] && (
				<button className='btn btn-danger' onClick={handleDelete}>
					<a>Delete</a>
				</button>
			)}
		</div>
	);
};

export default Form;
