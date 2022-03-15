import React, { ChangeEvent, useState } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import ReactCountryFlag from 'react-country-flag';

//props
export type SearchbarProps = {
    name: string;
    placeholder?: string;
    className?: string;
  };

//Data role
type Role =  1 | 2;
const ROLE_EMPLOYEE: Role = 1;
const ROLE_COUNTRY: Role = 2;


//dataset
const employeeData = [
  {
    id: 1,
    employeeName: "Sandra",
    employerName: "Jane",
    occupation: "Product manager",
    role: 1
  },
  {
    id: 2,
    employeeName: "John",
    employerName: "Tomas",
    occupation: "Front end developer",
    role: 1
  },
  {
    id: 3,
    employeeName: "Mattis",
    employerName: "Jonas",
    occupation: "Back end developer",
    role: 1
  },
  {
    id: 4,
    employeeName: "Tom",
    employerName: "Jonas",
    occupation: "Back end developer",
    role: 1
  },
];

    const countryData = [
      {
        id: 1,
        country: "Sweden",
        flag: "SE",
        role: 2,
      },
      {
        id: 2,
        country: "Germany",
        flag: "DE",
        role: 2,
      },
      {
        id: 3,
        country: "Japan",
        flag: "JP",
        role: 2,
      },
      {
        id: 4,
        country: "USA",
        flag: "US",
        role: 2,
      },
    ];


const SearchBar: React.FC<SearchbarProps> = ({
    name,
    placeholder,
    className,
  }) => {
    //data logic
    const [searchResult, setSearchResult] = React.useState("");
    const [listVisibility, setlistVisibility] = React.useState("invisible");
    const [showRole, setShowRole] = useState<Role>(ROLE_EMPLOYEE);

    var employeeresults = !searchResult ? employeeData : employeeData.filter(function (employee) {
          return employee.employeeName.toLowerCase().includes(searchResult.toLocaleLowerCase()) 
              // || (employee.country.toLowerCase().includes(searchResult.toLocaleLowerCase()))
              
        });
    var countryresults = !searchResult ? countryData : countryData.filter(function (country) {
            return country.country.toLowerCase().includes(searchResult.toLocaleLowerCase());
          });

    // searchresult onChange logic
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchResult(event.target.value);

      if (
        countryresults.length > employeeresults.length &&
        employeeresults.length == 0
      ) {
        setShowRole(ROLE_COUNTRY);
      } else if (
        countryresults.length < employeeresults.length &&
        countryresults.length == 0
      ) {
        setShowRole(ROLE_EMPLOYEE);
      }

      if (event.target.value != "") {
        setlistVisibility("visible");
      } else {
        setlistVisibility("invisible");
      }
    };

   
    return (
      <div className="wrap">
        <div className="search">
          <input
            name={name}
            type="text"
            className={className}
            placeholder={placeholder}
            value={searchResult}
            onChange={handleChange}
          />
          <i className="searchIcon fa fa-search"></i>
        </div>

        <ul className={`list-group ${listVisibility}`}>
          {/* employee list */}
          {employeeresults.map(
            item =>
            showRole == 1 && 
            (
                <li
                  className="list-group-item list-group-item-action"
                  key={item.id}
                  onClick={() => setSearchResult(item.employeeName)}
                >
                  {item.employeeName}
                  <div className="row">
                    <div className="column">
                      <span className="fa fa-sitemap" />
                      {item.employerName}
                    </div>
                    <div className="column">
                      <span className="fa fa-briefcase" />
                      {item.occupation}
                    </div>
                  </div>
                </li>   
              )
          )}

          {/* country list */}
          {countryresults.map(
            item =>
              showRole == 2 && 
              (
                <li
                  className="list-group-item list-group-item-action"
                  key={item.id}
                  onClick={() => setSearchResult(item.country)}
                >
                  <ReactCountryFlag
                    countryCode={item.flag}
                    svg
                    cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                    cdnSuffix="svg"
                    title={item.flag}
                    style={{
                      paddingRight: "5px",
                    }}
                  />
                  {item.country}
                </li>
              )
          )}
        </ul>
      </div>
    );
  }
  
export default SearchBar;


