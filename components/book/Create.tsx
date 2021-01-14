import React from "react";
import { FunctionComponent } from "react";
import { Formik } from "formik";
import Link from "next/link";

export const Create: FunctionComponent = () => {
	return (
		<div>
			<h1>Create</h1>
			<Formik
				initialValues={{
					isbn: "",
					title: "",
					description: "",
					author: "",
					publicationDate: "",
					reviews: "",
				}}
				// TODO voir si pertinent de laisser la validation (au choix de l'utilisateur ?)
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
						fetch("/books", {
							method: "post",
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
								type='date'
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
		</div>
	);
};

export default Create;
