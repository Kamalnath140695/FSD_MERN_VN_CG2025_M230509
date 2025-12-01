var products=[
   { id:1,
    name:"phone",
    price: 5000
   },
{ id:2,
    name:"earpods",
    price: 200
   },
{ id:2,
    name:"kitchen gadgets",
    price: 500
   }
]

const Products=()=>{
  
    return (
        <>
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>price</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {products.map(product=>(
                    <td>{product.id}</td>,
                    <td>{product.name}</td>,
                    <td>{product.price}</td>
                    ))}
            </tr>
            </tbody>
        </table>
        </>
    )
}

export default Products