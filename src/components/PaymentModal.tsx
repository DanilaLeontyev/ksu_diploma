import { Input, InputNumber, Modal, Radio, RadioChangeEvent, Rate } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';

interface PaymentModalProps extends React.ComponentProps<typeof Modal> {
  sum?: number;
}

function PaymentModal({ sum: initialSum, ...modalProps }: PaymentModalProps) {
  const [sum, setSum] = useState(initialSum);
  const [selectedTax, setSelectedTax] = useState(10);
  const [fixedTax, setFixedTax] = useState(0);

  const options: CheckboxGroupProps<string>['options'] = [
    { label: '0%', value: '0' },
    { label: '10%', value: '10' },
    { label: '15%', value: '15' },
  ];

  useEffect(() => {
    if (!initialSum) return;

    if (fixedTax > 0) {
      setSum(initialSum + fixedTax);
    } else {
      setSum(initialSum * (1 + selectedTax / 100));
    }
  }, [initialSum, selectedTax, fixedTax]);

  const handleTaxChange = (e: RadioChangeEvent) => {
    setSelectedTax(Number(e.target.value));
    if (fixedTax > 0) {
      setFixedTax(0);
    }
  };

  const handleFixedTaxChange = (value: number | null) => {
    setFixedTax(value || 0);
  };

  return (
    <Modal
      {...modalProps}
      title="Оплата"
      okText={`Итого к оплате ${sum?.toFixed(2)} ₽`}
      cancelText="Отмена"
      okButtonProps={{
        style: {
          backgroundColor: '#ffd600',
          borderColor: '#ffd600',
          color: '#232323',
        },
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <h3>Сколько чаевых желаете оставить?</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Radio.Group
              options={options}
              onChange={handleTaxChange}
              value={fixedTax > 0 ? undefined : String(selectedTax)}
              optionType="button"
              buttonStyle="solid"
            />
            <InputNumber
              addonAfter="₽"
              value={fixedTax > 0 ? fixedTax : null}
              onChange={handleFixedTaxChange}
              min={0}
              style={{ flex: 1 }}
            />
          </div>
        </div>

        <div>
          <h3>Оцените наше заведение и оставьте комментарий</h3>
          <Rate
            style={{
              display: 'block',
              textAlign: 'center',
              marginBottom: 16,
            }}
          />
          <Input.TextArea
            rows={4}
            placeholder="Напишите свой комментарий или пожелание тут"
          />
        </div>
      </div>
    </Modal>
  );
}

export default PaymentModal;
