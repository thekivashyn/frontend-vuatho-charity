# Visual direction: Sau mỗi đôi tay là một mái nhà

Created 2026-09-05 with the built-in image generation tool (`image_gen.imagegen`). These are editorial paintings, not photographs or evidence of actual beneficiaries. No invented beneficiary names, results, or impact statistics accompany them.

## Assets

Project files live in `public/images/`. Each scene has a 1536 × 1024 JPEG and a 768 × 512 variant, selected through `StoryImage` with responsive `srcSet`. Hero loads eagerly with high priority; supporting illustrations load lazily with explicit dimensions.

| Scene                 | Files                                            | Placement                                 |
| --------------------- | ------------------------------------------------ | ----------------------------------------- |
| Homecoming            | `homecoming.jpg`, `homecoming-768.jpg`           | Hero                                      |
| Livelihood and family | `home-stilllife.jpg`, `home-stilllife-768.jpg`   | Mission                                   |
| Quiet kindness        | `kindness.jpg`, `kindness-768.jpg`               | Donation and first process step           |
| Careful records       | `careful-records.jpg`, `careful-records-768.jpg` | Review step and transparency              |
| New morning           | `new-morning.jpg`, `new-morning-768.jpg`         | Final process step and closing invitation |

## Generation prompts

Every prompt begins with this shared art direction:

> Use case: illustration-story. Original editorial illustration for Vua Tho, Vietnamese craftspeople community website. Cinematic hand-painted gouache and oil-pastel texture, elegant restrained shapes, emotionally warm and dignified, contemporary Vietnamese everyday life. Palette deep petrol green, muted navy, warm ochre sunlight, creamy paper, terracotta accents. Clearly a painting, not a documentary photograph. Natural anatomy and hands. No text, typography, logos, watermarks, QR codes, cash, medical distress, charity stereotypes, luxury or exaggerated sadness.

### Homecoming

Landscape 1536x1024 hero painting: Vietnamese craftsman father arriving at his modest welcoming home after work, wearing navy work shirt and carrying small canvas tool bag. His young daughter runs into a gentle hug at the doorway; spouse quietly seen in warm interior background. Characters grouped on right two thirds, environment on left. Golden late afternoon sidelight, climbing leaves, Vietnamese tiled threshold, authentic lived-in house. Wide cinematic composition, beautiful spatial depth, joyful quiet reunion. Preserve heads and hands away from edges. Fill complete canvas.

### Home still life

Landscape 1536x1024 painting: still life in a modest Vietnamese family home. Well used canvas tool bag, work gloves and folded indigo work shirt near an open doorway, child's school backpack and small wooden dinner table softly visible deeper in the home. Dappled warm morning light across textured floor, green shutters, potted plant. Intimate close composition with layered domestic depth, no people. The tools connect a working livelihood with a family, not a product advertisement.

### Kindness

Landscape 1536x1024 painting: intimate cropped scene at a Vietnamese home's small wooden table, two adults facing each other (one in navy work shirt, one cream shirt), one gently placing a plain unmarked cream envelope on table while the other's hands rest appreciatively nearby. Two small cups of tea, soft green window in background. Frame from shoulders down, hands anatomically correct, no faces necessary, quiet respectful conversation, supporting each other as equals, no money visible, no staged handshake.

### Careful records

Landscape 1536x1024 painting: close intimate view of a wooden table beside a leafy sunlit window in a Vietnamese home or small community office. A person's hands carefully reviewing an open plain notebook with abstract unreadable lines, a few cream paper receipts without legible writing, ceramic cup of tea. Warm sunlight and dark green foliage, thoughtful calm attention. No charts, no numbers, no bank logos, no computer screen. Beautiful restrained editorial still life showing care and responsibility.

### New morning

Landscape 1536x1024 painting: back three-quarter view of a Vietnamese craftsman in indigo shirt, carrying canvas tool bag, stepping from his home into a quiet sunlit neighborhood lane early morning. A small hand from his child waves goodbye near doorway, greenery and simple pastel facades. Warm hopeful golden light ahead, soft long shadows, quiet dignity. Person on left third, open lane extends right, cinematic depth, uncluttered scene.
