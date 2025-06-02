export default function TestPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-4">测试页面</h1>
      <p className="text-lg">
        这是一个简单的测试页面，用来验证应用是否能正常显示。
      </p>
      <div className="mt-4 p-4 bg-gray-200 rounded">
        <p>如果您能看到这个页面，说明基本渲染功能是正常的。</p>
      </div>
    </div>
  );
}
