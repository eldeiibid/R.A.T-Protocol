export class Pathfinder {

    constructor(layer) {
        this.layer = layer;
        this.width = layer.tilemap.width;
        this.height = layer.tilemap.height;
        this.tileW = layer.tilemap.tileWidth;
        this.tileH = layer.tilemap.tileHeight;

        // Rejilla de bloqueos: true = tile con colisión
        this.blocked = [];
        for (let y = 0; y < this.height; y++) {
            this.blocked[y] = [];
            for (let x = 0; x < this.width; x++) {
                const tile = layer.getTileAt(x, y);
                this.blocked[y][x] = !!tile && tile.collides;
            }
        }
    }

    isBlocked(x, y) {
        // fuera del mapa también cuenta como bloqueado
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) return true;
        return this.blocked[y][x];
    }

    // Devuelve un array de puntos {x, y} en coordenadas del mundo (centro de cada tile),
    // sin incluir el tile de inicio. null si no hay camino.
    findPath(fromX, fromY, toX, toY, maxNodes = 400) {
        // worldToTile ya tiene en cuenta el offset de la capa (TILEMAP_YOFFSET)
        const sx = this.layer.worldToTileX(fromX);
        const sy = this.layer.worldToTileY(fromY);
        const gx = this.layer.worldToTileX(toX);
        const gy = this.layer.worldToTileY(toY);

        if (this.isBlocked(gx, gy)) return null;
        if (sx === gx && sy === gy) return [];

        const key = (x, y) => y * this.width + x;
        const heuristic = (x, y) => {
            // distancia octil (movimiento en 8 direcciones)
            const dx = Math.abs(x - gx), dy = Math.abs(y - gy);
            return (dx + dy) + (Math.SQRT2 - 2) * Math.min(dx, dy);
        };

        const open = [{ x: sx, y: sy, g: 0, f: heuristic(sx, sy), parent: null }];
        const best = new Map([[key(sx, sy), 0]]);
        const closed = new Set();
        let expanded = 0;

        const dirs = [
            [1, 0], [-1, 0], [0, 1], [0, -1],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        while (open.length > 0 && expanded < maxNodes) {
            // nodo con menor f (el mapa es pequeño, una búsqueda lineal basta)
            let idx = 0;
            for (let i = 1; i < open.length; i++) {
                if (open[i].f < open[idx].f) idx = i;
            }
            const current = open.splice(idx, 1)[0];
            const ck = key(current.x, current.y);
            if (closed.has(ck)) continue;
            closed.add(ck);
            expanded++;

            if (current.x === gx && current.y === gy) {
                return this.buildPath(current);
            }

            for (const [dx, dy] of dirs) {
                const nx = current.x + dx;
                const ny = current.y + dy;
                if (this.isBlocked(nx, ny)) continue;

                // Evitar "cortar esquinas": en diagonal, ambos laterales deben estar libres
                if (dx !== 0 && dy !== 0 &&
                    (this.isBlocked(current.x + dx, current.y) ||
                     this.isBlocked(current.x, current.y + dy))) continue;

                const nk = key(nx, ny);
                if (closed.has(nk)) continue;

                const g = current.g + (dx !== 0 && dy !== 0 ? Math.SQRT2 : 1);
                if (best.has(nk) && best.get(nk) <= g) continue;
                best.set(nk, g);

                open.push({ x: nx, y: ny, g, f: g + heuristic(nx, ny), parent: current });
            }
        }
        return null; // sin camino (o se superó maxNodes)
    }

    buildPath(node) {
        const path = [];
        while (node.parent) { // el nodo inicial no se incluye
            path.push({
                x: this.layer.tileToWorldX(node.x) + this.tileW / 2,
                y: this.layer.tileToWorldY(node.y) + this.tileH / 2
            });
            node = node.parent;
        }
        return path.reverse();
    }
}