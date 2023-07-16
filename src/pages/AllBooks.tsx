import Card from "../components/Card";

export default function AllBooks() {
  return (
    <>
      <div className="py-12">
        <p className="pb-12 text-center text-3xl font-bold text-lime-950 ">
          All Books
        </p>
        <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
}
