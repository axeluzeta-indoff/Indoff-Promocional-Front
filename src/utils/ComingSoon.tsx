import { Button } from 'antd';
import { ToolOutlined } from '@ant-design/icons';

export default function ComingSoon({
  title = 'Estamos trabajando en esto',
  message = 'Muy pronto estará disponible esta funcionalidad.',
  onBack,
}: {
  title?: string;
  message?: string;
  onBack?: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <ToolOutlined className="text-6xl text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="mt-3 text-gray-600">{message}</p>

        {onBack && (
          <Button
            type="primary"
            size="large"
            className="mt-6"
            onClick={onBack}
          >
            Volver
          </Button>
        )}
      </div>
    </div>
  );
}
