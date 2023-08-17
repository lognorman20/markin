import rTabs from './utils/rTabs';

const cheeseString = `
# The Wonderful World of Cheese

Cheese is a delightful and versatile dairy product loved by many. Let's explore some of its varieties, characteristics, and trivia.

## Types of Cheese

Here are some popular types of cheese:

1. **Cheddar**: A sharp, aged cheese with a tangy flavor.
2. **Brie**: A creamy and soft cheese with a mild aroma.
3. **Blue Cheese**: Known for its distinctive blue veins and strong taste.
4. **Parmesan**: A hard and granular cheese often grated over pasta.
5. **Gouda**: A semi-hard cheese with a buttery and slightly nutty taste.

## Cheese Characteristics

Cheese can vary in terms of:

- **Texture**: Soft, semi-soft, semi-hard, or hard.
- **Flavor**: Ranging from mild to strong and pungent.
- **Aroma**: From mild and earthy to intense and tangy.

## Recipe: Cheesy Pasta

Try this simple and cheesy pasta recipe:

Ingredients:

- 250g pasta
- 1 cup heavy cream
- 1 cup grated parmesan
- Salt and pepper to taste

Instructions:

1. Boil the pasta until al dente. Drain and set aside.
2. In a saucepan, heat the heavy cream over medium heat.
3. Add the grated parmesan and stir until melted and creamy.
4. Season with salt and pepper.
5. Toss the cooked pasta in the creamy cheese sauce.
6. Serve hot and garnish with additional parmesan if desired.

> "Cheese is milk's leap toward _immortality_." - Clifton Fadiman

## Cheese Trivia

Did you know?

- The world's most expensive cheese is **Pule Cheese**, made from donkey milk.
- **Feta Cheese** is a staple in Greek cuisine and is traditionally made from sheep's milk.
- The holes in Swiss cheese are called "eyes."

## Cheese Facts

Here are some interesting cheese facts:

- Cheese-making dates back over **4,000 years**.
- **Roquefort**, a type of *blue cheese*, is aged in caves.
- **Camembert** is said to have originated in **Normandy, France**.

## Real World Cheese

Here's an example of how to create a simple cheese class in Python:

\`\`\`ocaml
(* Define a cheese type *)
type cheese = {
    name : string;
    flavor : string;
    origin : string;
}

(* Recursive function to create a list of cheeses *)
let rec create_cheese_list count =
    match count with
    | 0 -> []
    | n ->
        let new_cheese = {
            name = "Cheese" ^ string_of_int n;
            flavor = "Flavor" ^ string_of_int n;
            origin = "Origin" ^ string_of_int n;
        } in
        new_cheese :: create_cheese_list (n - 1)

(* Currying function to filter cheeses based on flavor *)
let filter_cheeses_by_flavor flavor cheeses =
    List.filter (fun cheese -> cheese.flavor = flavor) cheeses

let () =
    (* Create a list of cheeses *)
    let cheese_list = create_cheese_list 5 in
    List.iter (fun cheese -> Printf.printf "Name: %s, Flavor: %s\n" cheese.name cheese.flavor) cheese_list;

    (* Filter cheeses by flavor *)
    let filtered_cheeses = filter_cheeses_by_flavor "Flavor3" cheese_list in
    Printf.printf "\nFiltered cheeses:\n";
    List.iter (fun cheese -> Printf.printf "Name: %s, Flavor: %s\n" cheese.name cheese.flavor) filtered_cheeses;
\`\`\`

This \`Cheese\` class can be used for all of your cheese related needs.

## Cheese Varieties

| Cheese Variety | Flavor    | Origin       |
|----------------|-----------|--------------|
| Cheddar        | Sharp     | England      |
| Brie           | Creamy    | France       |
| Blue Cheese    | Strong    | Various      |
| Parmesan       | Nutty     | Italy        |
| Gouda          | Buttery   | Netherlands  |
`;

const examples = {
    'cheese': rTabs(cheeseString)
}

export default examples;