export interface Product {
    quantity: number;
    _id: string;
    _type: "product";
    title: string;
    description: string;
    slug?: { // Made optional for type safety
        _type: "slug";
        current: string;
    };
    price: number;
    productImage?: {
        asset?: {
            _ref: string;
            _type: "reference";
        };
    };
    tags?: string[];
    discountPercentage?: number;
    inventory: number;
    isNew?: boolean;
}
