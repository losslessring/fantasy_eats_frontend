export interface restaurant_restaurant_restaurant_menu_options_choices {
    __typename: 'DishChoice'
    name: string
    extra: number | null
}

export interface restaurant_restaurant_restaurant_menu_options {
    __typename: 'DishOption'
    name: string
    extra: number | null
    choices: restaurant_restaurant_restaurant_menu_options_choices[] | null
}
