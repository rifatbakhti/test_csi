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


class ProiritySubform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        valsCache: {
          "tm_priority": "disabled",
          "checkbox1": "false",
          "checkbox2": "false",
          "checkbox3": "false",
          "checkbox4": "false",
          "checkbox5": "false",
          "checkbox6": "false",
        }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.type == "checkbox") {
      this.state.valsCache[event.target.name] = event.target.checked;
    }
    else {
      this.state.valsCache[event.target.name] = event.target.value;
    }
    console.log(this.state.valsCache);
    this.setState({valsCache: this.state.valsCache});
  }

  render() {
    var selector = (
      <table>
        <tbody>
          <tr>
            <td>Приоритет товарного знака</td>
            <td>
            <select width="200px" name="tm_priority" value={this.state.valsCache["tm_priority"]} onChange={this.handleChange}>
              <option value="disabled">не устанавливать</option>
              <option value="enabled">установить</option>
            </select>
            </td>
          </tr>
        </tbody>
      </table>
    );
    var result = [selector];
    if (this.state.valsCache["tm_priority"] == "enabled") {
      result.push(
      <table className="styled-table">
        <tbody>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox1" value={this.state.valsCache["checkbox1"]} onChange={this.handleChange} />по дате подачи первой(ых) заявки(ок) в государстве - участнике Парижской конвенции по охране промышленной собственности (п. 1 ст. 1495 Кодекса)</label></td></tr>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox2" value={this.state.valsCache["checkbox2"]} onChange={this.handleChange} />по дате начала открытого показа экспоната на выставке (пункт 2 статьи 1495 Кодекса)</label></td></tr>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox3" value={this.state.valsCache["checkbox3"]} onChange={this.handleChange} />по дате приоритета первоначальной заявки, из которой данная заявка выделена (пункт 2 статьи 1494 Кодекса)</label></td></tr>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox4" value={this.state.valsCache["checkbox4"]} onChange={this.handleChange} />по дате международной регистрации (п. 4 ст. 1495 Кодекса)</label></td></tr>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox5" value={this.state.valsCache["checkbox5"]} onChange={this.handleChange} />по дате внесения записи о территориальном расширении по международной регистрации (п. 4 ст. 1495 Кодекса)</label></td></tr>
          <tr><td colSpan="2"><label><input type="checkbox" name="checkbox6" value={this.state.valsCache["checkbox6"]} onChange={this.handleChange} />по дате приоритета международной регистрации (п. 4 ст. 1495 Кодекса)</label></td></tr>
          <tr><td colSpan="2">проверить валидность сочетаний галок</td></tr>
          <tr><td colSpan="2"></td></tr>
          <tr><td colSpan="2">ПРОШУ УСТАНОВИТЬ ДАТУ ПОДАЧИ НАСТОЯЩЕЙ ЗАЯВКИ по дате подачи первоначальной заявки, из которой данная заявка выделена (ст. 1491, п. 2 ст. 1502 Кодекса);</td></tr>
          <tr><td>№ первой заявки</td><td><input type="text" name="first_app_num" value={this.state.valsCache["first_app_num"]} onChange={this.handleChange} /></td></tr>
          <tr><td>Дата испрашиваемого приоритета</td><td><input type="date" name="first_app_date" value={this.state.valsCache["first_app_date "]} onChange={this.handleChange} /></td></tr>
          <tr><td>Код страны подачи по стандарту ВОИС ST. 3 (при испрашивании конвенционного приоритета)</td><td><input type="text" name="first_app_country" value={this.state.valsCache["first_app_country"]} onChange={this.handleChange} /></td></tr>
          <tr><td>№ первоначальной заявки</td><td><input type="text" name="init_app_num" value={this.state.valsCache["init_app_num"]} onChange={this.handleChange} /></td></tr>
          <tr><td>Дата испрашиваемого приоритета</td><td><input type="date" name="init_app_date" value={this.state.valsCache["init_app_date "]} onChange={this.handleChange} /></td></tr>
          <tr><td>Код страны подачи по стандарту ВОИС ST. 3 (при испрашивании конвенционного приоритета)</td><td><input type="text" name="init_app_country" value={this.state.valsCache["init_app_country"]} onChange={this.handleChange} /></td></tr>
          <tr><td>№ международной регистрации</td><td><input type="text" name="int_app_date_app_num" value={this.state.valsCache["int_app_num"]} onChange={this.handleChange} /></td></tr>
          <tr><td>Дата испрашиваемого приоритета</td><td><input type="date" name="int_app_date" value={this.state.valsCache["int_app_date "]} onChange={this.handleChange} /></td></tr>
          <tr><td>Код страны подачи по стандарту ВОИС ST. 3 (при испрашивании конвенционного приоритета) тут везде конвенционный?</td><td><input type="text" name="int_app_country" value={this.state.valsCache["int_app_country"]} onChange={this.handleChange} /></td></tr>
        </tbody>
      </table>
      );
    }
    return result;
  }
};


const subformContainers = new Map(
  [
	  [InstApplSubform, document.querySelector("#inst_appl_subform")],
    [IndivApplSubform, document.querySelector("#indiv_appl_subform")],
    [Representative, document.querySelector("#representative")],
    [ProiritySubform, document.querySelector("#priority_subform")]
  ]
);

for (let [key, value] of subformContainers) {
    ReactDOM.render(React.createElement(key), value);
}

