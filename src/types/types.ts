
export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormValues {
    email: string;
    password: string;
}

export interface InitialState{
    error: string | null,
    isLoading: boolean,
    isLoggedIn: boolean,
    isRefreshing:boolean
}

export interface Recipe{
    name: string;
    description: string;
    cookTime: number;
    servings: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    ingredients: string[];
    instructions: string;
}

export interface RecipeWithId extends Recipe{
    _id: string
}
export interface AddRecipeFormValues {
    error: string | null,
    isLoading: boolean,
    recipes:RecipeWithId[],
    recipe: RecipeWithId

}

export interface AddRecipeFormProps {
    onClose: () => void;
}