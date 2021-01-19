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
				validate={(values) => {
					const errors = {};
					//set your validation logic here
				}}
				onSubmit={(values, { setSubmitting, setStatus }) => {
					try {
						fetch("/books", {
							method: "post",
							body: JSON.stringify(values),
						});
						setStatus({
							created: true,
							msg: "Element created",
						});
					} catch (error) {
						setStatus({
							created: false,
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
								type='date'
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
									status.created ? "alert-success" : "alert-error"
								}`}
								role='alert'
							>
								{status.msg}
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
		</div>
	);
};

export default Create;
