// lalala

class IndivApplSubform extends React.Component {
  prefix = "a";
  formDefaults = {
  	    "_last_name": "",
  	    "_first_name": "",
  	    "_patronic_name": "",
  	    "_address": "",
  	    "_country": "RU",
  	    "_inn": "",
        "_snils": "",
        "_pass_type": "RU",
        "_pass_seria": "",
        "_pass_number": "",
        "_occupation": ""
  };

  constructor(props) {
    super(props);
    this.state = { 
      blocksNum: 0,
      blocksCached: 0,
      valsCache: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }

  handleChange(event) {
  	console.log(event.target.type);
  	if (event.target.type == "button") {
  	  var defs = this.formDefaults;
  	  for (const property in defs) {
  	    this.state.valsCache[event.target.name + property] = defs[property];
      } 
  	}
  	else {
  	    this.state.valsCache[event.target.name] = event.target.value;
  	}
  	console.log(this.state.valsCache);
    this.setState({valsCache: this.state.valsCache});
  }

  addBlock() {
  	if (this.state.blocksCached > this.state.blocksNum + 1) {
  	    this.setState({ blocksNum: this.state.blocksNum + 1});
  	}
  	else {
  	    var defs = this.formDefaults;
  		for (const property in defs) {
  	        this.state.valsCache[this.prefix + (this.state.blocksNum + 1) + property] = defs[property];
        } 
  		this.setState({ blocksNum: this.state.blocksNum + 1, blocksCached: this.state.blocksCached + 1, valsCache: this.state.valsCache});
  	}
  }

  removeBlock() {
    this.setState({ blocksNum: Math.max(this.state.blocksNum - 1, 0) });
  }

  indivSubformBlock(argNum) {
  	var arg = this.prefix + argNum;
    return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Заявитель [частное лицо] {argNum}</td>
            <td><input type="button" name={arg} onClick={this.handleChange} value="очистить" /></td>
          </tr>
        </tbody>
      </table>
      <table className="styled-table">
       <tbody>
        <tr>	
          <th width="300px">Поле</th>
          <th>Значение</th>
          <th>Комментарий</th>
        </tr>
        <tr>
          <td>Фамилия</td>
          <td><input type="text" name={arg + "_last_name"} value={this.state.valsCache[arg + "_last_name"]} onChange={this.handleChange} /></td>
          <td>коммент</td>
        </tr>
        <tr>
          <td>Имя</td>
          <td><input type="text" name={arg + "_first_name"} value={this.state.valsCache[arg + "_first_name"]} onChange={this.handleChange}  /></td>
          <td>коммент</td>
        </tr>
        <tr>
          <td>Отчество (при наличии)</td>
          <td><input type="text" name={arg + "_patronic_name"} value={this.state.valsCache[arg + "_patronic_name"]} onChange={this.handleChange} /></td>
          <td>коммент</td>
        </tr>
        <tr>
          <td>Адрес для корреспонденции</td>
          <td><input type="text" name={arg + "_address"} value={this.state.valsCache[arg + "_address"]} onChange={this.handleChange} /></td>
          <td>КЛАДР</td>
        </tr>
        <tr>
          <td>Страна</td>
          <td><select width="200px" name={arg + "_country"} value={this.state.valsCache[arg + "_country"]} onChange={this.handleChange}>
              <option key="ru" value="RU">Россия</option>
              <option key="ua" value="UA">Украина</option>
              <option key="tr" value="TR">Турция</option>
              <option key="bl" value="BL">Беларусь</option>
              </select>
          </td>
          <td>КЛАДР</td>
        </tr>
        <tr>
          <td>ИНН</td>
          <td><input type="text" name={arg + "_inn"} value={this.state.valsCache[arg + "_inn"]} onChange={this.handleChange} /></td>
          <td>прикрутить формат (10 символов) XXXXXXXXXX  ? проверить 10 или 12 узнать на <a href="https://service.nalog.ru/inn.html" target="new">nalog.ru</a></td>
        </tr>
        <tr>
          <td>СНИЛС</td>
          <td><input type="text" name={arg + "_snils"} value={this.state.valsCache[arg + "_snils"]} onChange={this.handleChange} /></td>
          <td>прикрутить формат (10 символов) XXX-XXX-XX XX</td>
        </tr>
        <tr>
          <td>Паспорт</td>
          <td><select width="200px" name={arg + "_pass_type"} value={this.state.valsCache[arg + "_pass_type"]} onChange={this.handleChange}>
              <option value="RU">Паспорт РФ</option>
              <option value="FOREIGN">Паспорт иностранного гражданина</option>
              </select>
          </td>
          <td>варианты</td>
        </tr>
        <tr>
          <td>Серия</td>
          <td><input type="text" name={arg + "_pass_seria"} value={this.state.valsCache[arg + "_pass_seria"]} onChange={this.handleChange} /></td>
          <td>XX XX</td>
        </tr>
        <tr>
          <td>Номер</td>
          <td><input type="text" name={arg + "_pass_number"} value={this.state.valsCache[arg + "_pass_number"]} onChange={this.handleChange} /></td>
          <td>XXX XXX</td>
        </tr>
        <tr>
          <td>Должность</td>
          <td><input type="text" name={arg + "_occupation"} value={this.state.valsCache[arg + "_occupation"]} onChange={this.handleChange} /></td>
          <td>?</td>
        </tr>
       </tbody>
      </table>
    </div>
    );
  }

  render() {
  	var result = [
  	  <input type="button" value="добавить" onClick={this.addBlock} />,
  	  <input type="button" value="удалить" onClick={this.removeBlock} />
  	];
  	for (var i = 1; i <= this.state.blocksNum; i++) {
      result.push(this.indivSubformBlock(i));
    }
    return result;
  }
};


class InstApplSubform extends React.Component {
  prefix = "o";
  formDefaults = {
  	    "_org_name": "",
  	    "_address": "",
  	    "_ogrn": "",
  	    "_kpp": "",
        "_inn": ""
  };

  constructor(props) {
    super(props);
    this.state = { 
      blocksNum: 0,
      blocksCached: 0,
      valsCache: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }


  handleChange(event) {
  	console.log(event.target.type);
  	if (event.target.type == "button") {
  	  var defs = this.formDefaults;
  	  for (const property in defs) {
  	    this.state.valsCache[event.target.name + property] = defs[property];
      } 
  	}
  	else {
  	    this.state.valsCache[event.target.name] = event.target.value;
  	}
  	console.log(this.state.valsCache);
    this.setState({valsCache: this.state.valsCache});
  }

  addBlock() {
  	if (this.state.blocksCached > this.state.blocksNum + 1) {
  	    this.setState({ blocksNum: this.state.blocksNum + 1});
  	}
  	else {
  	    var defs = this.formDefaults;
  		for (const property in defs) {
  	        this.state.valsCache[this.prefix + (this.state.blocksNum + 1) + property] = defs[property];
        } 
  		this.setState({ blocksNum: this.state.blocksNum + 1, blocksCached: this.state.blocksCached + 1, valsCache: this.state.valsCache});
  	}
  }

  removeBlock() {
    this.setState({ blocksNum: Math.max(this.state.blocksNum - 1, 0) });
  }

  instSubformBlock(argNum) {
  	var arg = this.prefix + argNum;
    return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Заявитель [организация] {argNum}</td>
            <td><input type="button" name={arg} onClick={this.handleChange} value="очистить" /></td>
          </tr>
        </tbody>
      </table>
      <table className="styled-table">
        <tbody>
          <tr>
              <th width="300px">Поле</th>
              <th>Значение</th>
              <th>Комментарий</th>
          </tr>
          <tr>
              <td>Наименование юридического лица</td>
              <td><input type="text" name={arg + "_org_name"} value={this.state.valsCache[arg + "_org_name"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
          </tr>
          <tr>
              <td>Адрес для корреспонденции</td>
              <td><input type="text" name={arg + "_address"} value={this.state.valsCache[arg + "_address"]} onChange={this.handleChange} /></td>
              <td>КЛАДР</td>
          </tr>
          <tr>
              <td>ОГРН</td>
              <td><input type="text" name={arg + "_ogrn"} value={this.state.valsCache[arg + "ogrn"]} onChange={this.handleChange} /></td>
              <td>прикрутить формат (15 символов) XXXXX XXXXX XXXXX</td>
          </tr>
          <tr>
              <td>КПП</td>
              <td><input type="text" name={arg + "_kpp"} value={this.state.valsCache[arg + "_kpp"]} title="10 символов" onChange={this.handleChange} /></td>
              <td>прикрутить формат (10 символов) XXXXXXXXXX</td>
          </tr>
          <tr>
              <td>ИНН</td>
              <td><input type="text" name={arg + "_inn"} value={this.state.valsCache[arg + "_inn"]} onChange={this.handleChange} /></td>
              <td>прикрутить формат (10 символов) XXXXXXXXXX ? проверить 10 или 12 <a href="https://pb.nalog.ru/search.html#quick-result?queryAll=6319252148&mode=search-all&page=1&pageSize=10">проверить</a>
                  + попытаться подтянуть остальные идентификаторы по ИНН
              </td>
          </tr>
       </tbody>
      </table>
    </div>
    );
  }

  render() {
  	var result = [
  	  <input type="button" value="добавить" onClick={this.addBlock} />,
  	  <input type="button" value="удалить" onClick={this.removeBlock} />
  	];
  	for (var i = 1; i <= this.state.blocksNum; i++) {
      result.push(this.instSubformBlock(i));
    }
    return result;
  }
}


class Representative extends React.Component {
  prefix = "r";
  formDefaults = {
 	"_type": "POVER",
 	"_last_name": "",
 	"_first_name": "",
    "_patronic_name": "",
    "_occupation": "",
 	"_address": "",
 	"_phone": "",
 	"_fax": "",
    "_email": "",
    "_cert_id": "",
    "_repr_to": "",
    "_repr_from": ""
  };

  constructor(props) {
    super(props);
    this.state = {
        blocksNum: 0,
        blocksCached: 0,
    	valsCache: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }

  handleChange(event) {
  	if (event.target.type == "button") {
  	  var defs = this.formDefaults;
  	  for (const property in defs) {
  	    this.state.valsCache[event.target.name + property] = defs[property];
      } 
  	}
  	else {
  	    this.state.valsCache[event.target.name] = event.target.value;
  	}
  	console.log(this.state.valsCache);
    this.setState({valsCache: this.state.valsCache});
  }

  addBlock() {
  	if (this.state.blocksCached > this.state.blocksNum + 1) {
  	    this.setState({ blocksNum: this.state.blocksNum + 1});
  	}
  	else {
  	    var defs = this.formDefaults;
  		for (const property in defs) {
  	        this.state.valsCache[this.prefix + (this.state.blocksNum + 1) + property] = defs[property];
        } 
  		this.setState({ blocksNum: this.state.blocksNum + 1, blocksCached: this.state.blocksCached + 1, valsCache: this.state.valsCache});
  	}
  }

  removeBlock() {
    this.setState({ blocksNum: Math.max(this.state.blocksNum - 1, 0) });
  }

  representativeHeaderBlock(argNum) {
  	var arg = this.prefix + argNum;
    return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>Представитель {argNum}</td>
            <td>
            <select width="200px" name={arg + "_type"} value={this.state.valsCache[arg + "_type"]} onChange={this.handleChange}>
              <option value="POVER">Патентный поверненный</option>
              <option value="OTHER">Иной гражданин</option>
            </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    );
  }

  representativeBodyBlock(argNum, blockType) {
  	var arg = this.prefix + argNum;
  	if (blockType == "POVER") {
  	  return (
  	  	<table className="styled-table">
  	  	  <tbody>
  	  	    <tr>
              <td>Фамилия</td>
              <td><input type="text" name={arg + "_last_name"} value={this.state.valsCache[arg + "_last_name"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Имя</td>
              <td><input type="text" name={arg + "_first_name"} value={this.state.valsCache[arg + "_first_name"]} onChange={this.handleChange}  /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Отчество (при наличии)</td>
              <td><input type="text" name={arg + "_patronic_name"} value={this.state.valsCache[arg + "_patronic_name"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Должность</td>
              <td><input type="text" name={arg + "_occupation"} value={this.state.valsCache[arg + "_occupation"]} onChange={this.handleChange} /></td>
              <td>коммент - уточнить?</td>
            </tr>
            <tr>
              <td>Адрес для корреспонденции</td>
              <td><input type="text" name={arg + "_address"} value={this.state.valsCache[arg + "_address"]} onChange={this.handleChange} /></td>
              <td>КЛАДР</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td><input type="text" name={arg + "_phone"} value={this.state.valsCache[arg + "_phone"]} onChange={this.handleChange} /></td>
              <td>формат</td>
            </tr>
            <tr>
              <td>Факс</td>
              <td><input type="text" name={arg + "_fax"} value={this.state.valsCache[arg + "_fax"]} onChange={this.handleChange} /></td>
              <td>Надо ли вообще?</td>
            </tr>
            <tr>
              <td>Адрес электронной почты</td>
              <td><input type="text" placeholder="name@address.com" name={arg + "_email"} value={this.state.valsCache[arg + "_email"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Регистрационный номер поверенного</td>
              <td><input type="text" name={arg + "_cert_id"} value={this.state.valsCache[arg + "_cert_id"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
  	  	  </tbody>
  	  	</table>
  	  );
    }
    if (blockType == "OTHER") {
  	  return (
        <table className="styled-table">
  	  	  <tbody>
  	  	    <tr>
              <td>Фамилия</td>
              <td><input type="text" name={arg + "_last_name"} value={this.state.valsCache[arg + "_last_name"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Имя</td>
              <td><input type="text" name={arg + "_first_name"} value={this.state.valsCache[arg + "_first_name"]} onChange={this.handleChange}  /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Отчество (при наличии)</td>
              <td><input type="text" name={arg + "_patronic_name"} value={this.state.valsCache[arg + "_patronic_name"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Должность</td>
              <td><input type="text" name={arg + "_occupation"} value={this.state.valsCache[arg + "_occupation"]} onChange={this.handleChange} /></td>
              <td>коммент - уточнить?</td>
            </tr>
            <tr>
              <td>Адрес для корреспонденции</td>
              <td><input type="text" name={arg + "_address"} value={this.state.valsCache[arg + "_address"]} onChange={this.handleChange} /></td>
              <td>КЛАДР</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td><input type="text" name={arg + "_phone"} value={this.state.valsCache[arg + "_phone"]} onChange={this.handleChange} /></td>
              <td>формат</td>
            </tr>
            <tr>
              <td>Факс</td>
              <td><input type="text" name={arg + "_fax"} value={this.state.valsCache[arg + "_fax"]} onChange={this.handleChange} /></td>
              <td>Надо ли вообще?</td>
            </tr>
            <tr>
              <td>Адрес электронной почты</td>
              <td><input type="text" placeholder="name@address.com" name={arg + "_email"} value={this.state.valsCache[arg + "_email"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
            <tr>
              <td>Срок представительства: дата начала</td>
              <td><input type="date" name={arg + "_repr_from"} value={this.state.valsCache[arg + "_repr_from"]} onChange={this.handleChange} /></td>
              <td>проверить упорядоченность дат</td>
            </tr>
            <tr>
              <td>Срок представительства: дата окончания</td>
              <td><input type="date" name={arg + "_repr_to"} value={this.state.valsCache[arg + "_repr_to"]} onChange={this.handleChange} /></td>
              <td>коммент</td>
            </tr>
  	  	  </tbody>
  	  	</table>
  	  );
  	}
  }


  render() {
  	var result = [
  	  <input type="button" value="добавить" onClick={this.addBlock} />,
  	  <input type="button" value="удалить" onClick={this.removeBlock} />
  	];
  	for (var i = 1; i <= this.state.blocksNum; i++) {
      result.push(this.representativeHeaderBlock(i));      
      result.push(this.representativeBodyBlock(i, this.state.valsCache[this.prefix + i + "_type"]));
    }
    return result;
  }
};


const subformContainers = new Map(
  [
	[InstApplSubform, document.querySelector("#inst_appl_subform")],
    [IndivApplSubform, document.querySelector("#indiv_appl_subform")],
    [Representative, document.querySelector("#representative")],
  ]
);

for (let [key, value] of subformContainers) {
    ReactDOM.render(React.createElement(key), value);
}

