import './CanCard.css'

/**
 * One card for one can in the collection.
 * Purely display — the collection is edited in src/data/cans.js,
 * not through the UI.
 *
 * Props:
 *  - name: string — the can's name (required)
 *  - flavor: string — optional subtitle/flavor note
 *  - image: string — path or url for the can photo
 *  - collected: boolean — whether you actually have this one
 */
export default function CanCard({ name, flavor, image, collected }) {
  return (
    <div className={`can-card ${collected ? 'is-collected' : 'is-missing'}`}>
      <div className="can-card__photo">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="can-card__photo-empty" aria-hidden="true">
            <span>NO PHOTO</span>
          </div>
        )}
        {collected && <div className="can-card__stamp">COLLECTED</div>}
      </div>

      <div className="can-card__body">
        <h3 className="can-card__name">{name}</h3>
        {flavor && <p className="can-card__flavor">{flavor}</p>}
      </div>
    </div>
  )
}
