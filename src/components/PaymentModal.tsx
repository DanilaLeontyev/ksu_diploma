import { Input, InputNumber, Modal, Radio, Rate } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useEffect, useState } from "react";

interface PaymentModalProps extends React.ComponentProps<typeof Modal> {
  sum?: number;
}

function PaymentModal(props: PaymentModalProps) {
  const [sum, setSum] = useState(props.sum);
  const [selectedTax, setSelectedTax] = useState(10);
  const [fixedTax, setFixedTax] = useState(0);

  const options: CheckboxGroupProps<string>["options"] = [
    { label: "10%", value: "10" },
    { label: "15%", value: "15" },
    { label: "20%", value: "20" },
  ];

  useEffect(() => {
    if (fixedTax > 0) {
      setSum(props.sum + fixedTax);
    } else {
      setSum(props.sum * (1 + selectedTax / 100));
    }
  }, [props.sum, selectedTax, fixedTax]);

  const onTaxChange = (val) => {
    setSelectedTax(val.target.value);
  };

  const onChangeFixedTax = (val) => {
    setFixedTax(val);
  };

  return (
    <Modal
      {...props}
      title="Оплата"
      okText={`Итого к оплате ${sum?.toFixed(2)} ₽`}
      cancelText={"Отмена"}
    >
      <h3>Сколько чаевых желаете оставить?</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Radio.Group
          block
          onChange={onTaxChange}
          options={options}
          defaultValue="10"
          optionType="button"
          buttonStyle="solid"
        />
        <InputNumber
          addonAfter="₽"
          defaultValue={fixedTax}
          onChange={onChangeFixedTax}
        />
      </div>
      <h3>Оцените наше заведение и оставьте комментарий</h3>
      <Rate defaultValue={3} style={{ marginLeft: "30%" }} />
      <Input.TextArea
        style={{ marginTop: "20px" }}
        rows={4}
        placeholder="Напишите свой комментарий или пожелание тут"
      />
    </Modal>
  );
}

export default PaymentModal;
