import React, { useEffect } from 'react'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories } from '../../actions/category.actions'
/**
* @author
* @function Header
**/



const MenuHeader = (props) => {
  const category = useSelector(state => state.category)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const renderCategories = (categories) => {
    let myCategories = [];
    if (categories) {
      for (let category of categories) {
        myCategories.push(
          <li key={category._id}>
            {
              category.parentId ? <a
                href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                {category.name}
              </a> :
                <span>{category.name}</span>
            }
            {(category.children.length > 0) ? (
              <ul>
                {renderCategories(category.children)}
              </ul>
            ) : null}
          </li>
        )
      }
    }

    return myCategories;
  }

  return (
    <div className="menuHeader">
      <ul>
        {category.categoryList != null ? renderCategories(category.categoryList) : null}
      </ul>

    </div>
  )

}

export default MenuHeader