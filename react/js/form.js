// Veniamin Blinov@CSi Group
'use strict';

const OPTIONS_MKTU = [
  {"id": "1", "label": "Химические продукты"},
  {"id": "2", "label": "Краски, олифы, лаки"},
  {"id": "3", "label": "Препараты для чистки, парфюмерия и косметика"},
  {"id": "4", "label": "Технические масла, смазки, топлива"},
  {"id": "5", "label": "Фармацевтические препараты"},
  {"id": "6", "label": "Обычные металлы и сплавы"},
  {"id": "7", "label": "Машины, станки и двигатели"},
  {"id": "8", "label": "Ручные инструмены"},
  {"id": "9", "label": "Приборы, инструменты, оборудование"},
  {"id": "10", "label": "Медицинские приборы и инструменты"},
  {"id": "11", "label": "Устройства для получения тепла"},
  {"id": "12", "label": "Транспортные средства"},
  {"id": "13", "label": "Огнестрельное оружие и пиротехнические средства"},
  {"id": "14", "label": "Благородные металлы и их сплавы, изделия из них"},
  {"id": "15", "label": "Музыкальные инструменты"},
  {"id": "16", "label": "Бумага и изделия из бумаги"},
  {"id": "17", "label": "Резина, асбест, пластмассы"},
  {"id": "18", "label": "Кожа и имитация кожи"},
  {"id": "19", "label": "Неметаллические строительные материалы"},
  {"id": "20", "label": "Мебель и другие изделия"},
  {"id": "21", "label": "Домашняя и кухонная утварь"},
  {"id": "22", "label": "Верёвочно-канатные изделия"},
  {"id": "23", "label": "Нити текстильные и пряжа"},
  {"id": "24", "label": "Ткани, одеяла, покрывала и скатерти"},
  {"id": "25", "label": "Одежда, обувь, головные уборы"},
  {"id": "26", "label": "Галантерейные и басонные изделия"},
  {"id": "27", "label": "Покрытия для полов"},
  {"id": "28", "label": "Игрушки и спортивные товары"},
  {"id": "29", "label": "Продукты животного происхождения"},
  {"id": "30", "label": "Растительные пищевые продукты"},
  {"id": "31", "label": "Продукты земледелия и лесного хозяйства"},
  {"id": "32", "label": "Безалкогольные напитки и пиво"},
  {"id": "33", "label": "Алкогольные напитки (за исключением пива)"},
  {"id": "34", "label": "Табак и курительные принадлежности"},
  {"id": "35", "label": "Помощь в управлении бизнесом"},
  {"id": "36", "label": "Финансовые услуги"},
  {"id": "37", "label": "Строительство и ремонт"},
  {"id": "38", "label": "Телекоммуникации"},
  {"id": "39", "label": "Перевозка людей и товаров"},
  {"id": "40", "label": "Обработка материалов"},
  {"id": "41", "label": "Услуги обучения и развлекательные мероприятия"},
  {"id": "42", "label": "Научные и технические услуги"},
  {"id": "43", "label": "Гостиницы, кейтеринг"},
  {"id": "44", "label": "Медицинский и косметические услуги"},
  {"id": "45", "label": "Юридические услуги и службы безопасности"}
];

// Form layout; mb export and store as json? 
const G_TMFormLayout = {
  "subforms": [
    {
      "sf_name": "contact_data",
      "static": true,
      "header": "Адрес для переписки с РосПатентом",
      "fields_prefix": "cd",
      "fields": [ // here we store {type: "input" by default, default: "" by default, mandatory: false by default}
        {"id": "name_f", "label": "Фамилия"},
        {"id": "name_i", "label": "Имя"},
        {"id": "name_o", "label": "Отчество (при наличии)", "optional": true},
        {"id": "inst", "label": "Организация"},
        {"id": "addr", "label": "Адрес для корреспонденции"},
        {"id": "phone", "label": "Телефон"},
        {"id": "email", "label": "Адрес электронной почты"}
      ]
    },
    {
      "sf_name": "appl_man",
      "static": false, // for dynamic forms field_name = {prefix}_{name}_{appl_id}
      "header": "Заявители - физические лица",
      "fields_prefix": "am",
      "fields_var": [
        {"id": "name_f", "label": "Фамилия"},
        {"id": "name_i", "label": "Имя"},
        {"id": "name_o", "label": "Отчество"},
        {"id": "addr", "label": "Адрес"},
        {"id": "country", "label": "Страна", "type": "select_country", "default": "RU"},
        {"id": "inn", "label": "ИНН"},
        {"id": "snils", "label": "СНИЛС"},
        {"id": "pspt_type", "label": "Документ", "type": "select_passport", "defalut": "RU"},
        {"id": "pspt_seria", "label": "Серия паспорта"},
        {"id": "pspt_no", "label": "Номер паспорта"},
        {"id": "occup", "label": "Должность"},
      ]
    },
    {
      "sf_name": "appl_inst",
      "static": false,
      "header": "Заявители - организации",
      "fields_prefix": "ai",
      "fields_var": [
        {"id": "name", "label": "Наименование юридического лица"},
        {"id": "addr", "label": "Адрес"},
        {"id": "ogrn", "label": "ОГРН"},
        {"id": "kpp", "label": "КПП"},
        {"id": "inn", "label": "ИНН"}
      ]
    },
    {
      "sf_name": "appl_repr",
      "static": false,
      "header": "Представитель заявителя",
      "fields_prefix": "ar",
      "fields_var": [
        {"id": "type", "label": "Наименование юридического лица", "type": "select_repr_type", "default": "POVER"},
        {"id": "name_f", "label": "Фамилия"},
        {"id": "name_i", "label": "Имя"},
        {"id": "name_o", "label": "Отчество"},
        {"id": "occup", "label": "Должность"},
        {"id": "addr", "label": "Адрес"},
        {"id": "phone", "label": "Телефон"},
        {"id": "fax", "label": "Факс"},
        {"id": "email", "label": "Адрес электронной почты"},
        {"id": "cert_id", "label": "Регистрационный номер поверенного"},
        {"id": "repr_to", "label": "Срок представительства: дата начала", "type": "date"},
        {"id": "repr_from", "label": "Срок представительства: дата окончания", "type": "date"}
      ]
    },
    {
      "sf_name": "trademark_info",
      "static": true,
      "header": "Заявляемое обозначение",
      "fields_prefix": "tm",
      "fields": [
        {"id": "file", "label": "Файл обозначения", "type": "file", "default": "POVER", "comment": "ограничить или процессить, чтобы был размер (gif, jpeg, png), mb restriction? size?"},
        {"id": "desc", "label": "Описание", "type": "textarea"},
        {"id": "color_space", "label": "Цвет", "type": "select_color"},
        {"id": "color_list", "label": "Перечислите цвета (для цветных изображений)"},
        {"id": "hint_verbal", "label": "Указание: словесный знак", "type": "flag"},
        {"id": "hint_izo", "label": "Указание: изобразительный знак", "type": "flag"},
        {"id": "hint_vol", "label": "Указание: объёмный знак", "type": "flag"},
        {"id": "hint_mixed", "label": "Указание: комбинированный знак", "type": "flag"},
        {"id": "hint_other", "label": "Указание: другое", "type": "flag", "comment": "другой тип знака или какое-то другое указание?"},
        {"id": "type", "label": "Тип знака", "type": "select_tm_type"},
        {"id": "detl", "label": "Пояснение", "type": "textarea", "placeholder": "характеристики знака, не являющегося словесным, изобразительным или их комбинацией"},
        {"id": "shared", "label": "Коллективный знак", "type": "flag"},
        {"id": "prtcd_el", "label": "Охраняемые элементы", "type": "textarea", "placeholder": "перечислить охраняемые элементы заявляемого товарного знака"}
      ]
    },
    {
      "sf_name": "mktu",
      "static": true,
      "header": "Классы МКТУ",
      "fields_prefix": "tm",
      "fields": [
        {"id": "ids", "label": "Идентификаторы классов", "type": "select_mktu", "comment": "выберите один или несколько классов http://select2.org/getting-started/basic-usage или так сделать"}
      ]
    },
  ]
};

/* global cache for storing values */
var G_FormCache = {};

function handle_change(event) {
  if (event.target.type == "checkbox") {
    G_FormCache[event.target.name] = event.target.checked;
  }
  if (event.target.type == "select-multiple") {
    G_FormCache[event.target.name] = event.target.selectedOptions;
  }
  else {
    G_FormCache[event.target.name] = event.target.value;  
  }
  console.log(event.target);
  console.log(G_FormCache);
}

function select_repr_type(name_, value_, onclick_) {
  return (
    <select width="200px" name={name_} value={value_} onChange={onclick_}>
      <option value="POVER">Патентный поверненный</option>
      <option value="OTHER">Иной гражданин</option>
    </select>
  )
}

function element(type_, name_, label_, req_, comment_, placeholder_) {
  if (type_ === undefined || type_ == "text" ) {  // text
    return (
      <tr>
        <td>{label_}</td>
        <td> <input type="text" name={name_} placeholder={placeholder_ === undefined ? " " : placeholder_} className={req_ == true ? "mandatory" : "optional"} value={G_FormCache[name_]} onChange={handle_change} /></td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "textarea") {
    return (
      <tr>
        <td>{label_}</td>
        <td><textarea rows="2" cols="55" name={name_} placeholder={placeholder_ === undefined ? " " : placeholder_} className={req_ == true ? "mandatory" : "optional"} value={G_FormCache[name_]} onChange={handle_change} /></td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "flag") {
    return (
      <tr>
        <td>{label_}</td>
        <td><input type="checkbox" name={name_} value={G_FormCache[name_]} onChange={handle_change} /></td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "file") {
    return (
      <tr>
        <td>{label_}</td>
        <td> <input type="file" name={name_} value={G_FormCache[name_]} onChange={handle_change} /></td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "select_country") {
    return (
      <tr>
        <td>{label_}</td>
        <td>
          <select width="200px" name={name_} value={G_FormCache[name_]} onChange={handle_change}>
            <option key="ru" value="RU">Россия</option>
            <option key="ua" value="UA">Украина</option>
            <option key="tr" value="TR">Турция</option>
            <option key="bl" value="BL">Беларусь</option>
          </select>
        </td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "select_color") {
    return (
      <tr>
        <td>{label_}</td>
        <td>
          <select width="200px" name={name_} value={G_FormCache[name_]} onChange={handle_change}>
            <option value="GRAYSCALE">Чёрно-белое (оттенки серого)</option>
            <option value="COLOR">Цвертное</option>
          </select>
        </td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "select_tm_type") {
    return (
      <tr>
        <td>{label_}</td>
        <td>
          <select width="200px" name={name_} value={G_FormCache[name_]} onChange={handle_change}>
            <option value="LIGHT">световой знак</option>
            <option value="MUTABLE">изменяющийся знак</option>
            <option value="POSITIONAL">позиционный знак</option>
            <option value="TOUCH">осязательный знак</option>
            <option value="TASTE">вкусовой знак</option>
            <option value="HOLOGRAPHIC">голографический знак</option>
            <option value="SOUND">звуковой знак</option>
            <option value="SMELL">обонятельный знак</option>
            <option value="COLORS_ONLY">знак, состоящий исключительно из одного или нескольких цветов</option>
          </select>
        </td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    );
  }
  if (type_ == "select_mktu") {
    return (
      <tr>
        <td>{label_}</td>
        <td>
          <select size="15" name={name_} value={G_FormCache[name_]} onChange={handle_change} multiple>
            {
              OPTIONS_MKTU.map((el) => <option value={el.id} title={el.label}>{el.id + " - " + el.label}</option>)
            }
          </select>
        </td>
        <td>{comment_ === undefined ? "комментарий" : comment_}</td>
      </tr>
    ); 
  }
}


function generate_static_subform(sf_) {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <td colSpan="3">
            {sf_.header}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th width="300px">Поле</th>
          <th>Значение</th>
          <th>Комментарий</th>
        </tr>
        {
          sf_.fields.map((el) => element(el.type, sf_.fields_prefix + "_" + el.id, el.label, el.optional != true, el.comment, el.placeholder))
        }
      </tbody>
    </table>
  );
}






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

ReactDOM.render(
  generate_static_subform(G_TMFormLayout["subforms"][0]),
  document.querySelector("#contact_data_subform")
);

ReactDOM.render(
  generate_static_subform(G_TMFormLayout["subforms"][4]),
  document.querySelector("#trademark_info_subform")
);

ReactDOM.render(
  generate_static_subform(G_TMFormLayout["subforms"][5]),
  document.querySelector("#mktu_subform")
);

for (let [key, value] of subformContainers) {
    ReactDOM.render(React.createElement(key), value);
}

