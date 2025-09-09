import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './AddRecipeForm.module.css';
import type { Recipe } from "../../types/types.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store.ts";
import { selectIsLoading } from "../../redux/recipes/selectors.ts";
import { addRecipeThunk } from "../../redux/recipes/operations.ts";

interface AddRecipeFormProps {
    onClose: () => void;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, 'Recipe name must be at least 3 characters')
        .max(100, 'Recipe name must be less than 100 characters')
        .required('Recipe name is required'),
    
    description: Yup.string()
        .trim()
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must be less than 500 characters')
        .required('Description is required'),
    
    cookTime: Yup.number()
        .min(1, 'Cook time must be at least 1 minute')
        .max(480, 'Cook time must be less than 8 hours')
        .required('Cook time is required'),
    
    servings: Yup.number()
        .min(1, 'Servings must be at least 1')
        .max(20, 'Servings must be less than 20')
        .required('Servings is required'),
    
    difficulty: Yup.string()
        .oneOf(['Easy', 'Medium', 'Hard'], 'Difficulty must be Easy, Medium, or Hard')
        .required('Difficulty is required'),
    
    ingredients: Yup.array()
        .of(
            Yup.string()
                .trim()
                .min(2, 'Ingredient must be at least 2 characters')
                .required('Ingredient cannot be empty')
        )
        .min(2, 'Recipe must have at least 2 ingredients')
        .required('Ingredients are required'),
    
    instructions: Yup.string()
        .trim()
        .min(10, 'Instructions must be at least 10 characters')
        .required('Instructions are required')
});

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectIsLoading);

    const initialValues: Recipe = {
        name: '',
        description: '',
        cookTime: 1,
        servings: 1,
        difficulty: 'Easy',
        ingredients: [''],
        instructions: ''
    };

    const handleSubmit = (values: Recipe, actions: FormikHelpers<Recipe>) => {
        dispatch(addRecipeThunk(values));
        actions.resetForm();
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Add New Recipe</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, dirty, isValid }) => (
                        <Form className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="name" className={styles.label}>Recipe Name</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={styles.input}
                                        placeholder="Enter recipe name"
                                    />
                                    <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="difficulty" className={styles.label}>Difficulty</label>
                                    <Field as="select" id="difficulty" name="difficulty" className={styles.select}>
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </Field>
                                    <ErrorMessage name="difficulty" component="div" className={styles.errorMessage} />
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="description" className={styles.label}>Description</label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    className={styles.textarea}
                                    placeholder="Enter recipe description"
                                    rows={3}
                                />
                                <ErrorMessage name="description" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="cookTime" className={styles.label}>Cook Time (minutes)</label>
                                    <Field
                                        type="number"
                                        id="cookTime"
                                        name="cookTime"
                                        className={styles.input}
                                        placeholder="30"
                                    />
                                    <ErrorMessage name="cookTime" component="div" className={styles.errorMessage} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label htmlFor="servings" className={styles.label}>Servings</label>
                                    <Field
                                        type="number"
                                        id="servings"
                                        name="servings"
                                        className={styles.input}
                                        placeholder="4"
                                    />
                                    <ErrorMessage name="servings" component="div" className={styles.errorMessage} />
                                </div>
                            </div>

                            <div className={styles.arraySection}>
                                <label className={styles.label}>Ingredients</label>
                                <FieldArray name="ingredients">
                                    {({ remove, push }) => (
                                        <div>
                                            {values.ingredients.map((_, index) => (
                                                <div key={index} className={styles.arrayItem}>
                                                    <Field
                                                        name={`ingredients.${index}`}
                                                        className={styles.input}
                                                        placeholder={`Ingredient ${index + 1}`}
                                                    />
                                                    {values.ingredients.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className={styles.removeButton}
                                                            onClick={() => remove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                    <ErrorMessage name={`ingredients.${index}`} component="div" className={styles.errorMessage} />
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className={styles.addButton}
                                                onClick={() => push('')}
                                            >
                                                Add Ingredient
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="instructions" className={styles.label}>Instructions</label>
                                <Field
                                    as="textarea"
                                    id="instructions"
                                    name="instructions"
                                    className={styles.textarea}
                                    placeholder="Enter cooking instructions..."
                                    rows={5}
                                />
                                <ErrorMessage name="instructions" component="div" className={styles.errorMessage} />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!dirty || !isValid || isLoading}
                                    className={`${styles.submitButton} ${
                                        (!dirty || !isValid || isLoading) ? styles.submitButtonDisabled : ''
                                    }`}
                                >
                                    {isLoading ? 'Adding Recipe...' : 'Add Recipe'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddRecipeForm;